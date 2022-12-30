import { hashZomeCall } from "@holochain/serialization";
import { decode, encode } from "@msgpack/msgpack";
import Emittery from "emittery";
import nacl from "tweetnacl";
import { getLauncherEnvironment, isLauncher, signZomeCallTauri, } from "../../environments/launcher.js";
import { WsClient } from "../client.js";
import { catchError, DEFAULT_TIMEOUT, promiseTimeout, requesterTransformer, } from "../common.js";
import { getNonceExpiration, getSigningCredentials, randomNonce, } from "../zome-call-signing.js";
export class AppWebsocket extends Emittery {
    client;
    defaultTimeout;
    overrideInstalledAppId;
    constructor(client, defaultTimeout, overrideInstalledAppId) {
        super();
        this.client = client;
        this.defaultTimeout =
            defaultTimeout === undefined ? DEFAULT_TIMEOUT : defaultTimeout;
        this.overrideInstalledAppId = overrideInstalledAppId;
    }
    static async connect(url, defaultTimeout, signalCb) {
        // Check if we are in the launcher's environment, and if so, redirect the url to connect to
        const env = getLauncherEnvironment();
        if (env) {
            url = `ws://127.0.0.1:${env.APP_INTERFACE_PORT}`;
        }
        if (signalCb) {
            console.warn("Providing a signal callback on client initialization is deprecated. Instead add an event handler using `.on('signal', signalCb)`.");
        }
        const wsClient = await WsClient.connect(url, signalCb);
        const appWebsocket = new AppWebsocket(wsClient, defaultTimeout, env ? env.INSTALLED_APP_ID : undefined);
        wsClient.on("signal", (signal) => appWebsocket.emit("signal", signal));
        return appWebsocket;
    }
    _requester = (tag, transformer) => requesterTransformer((req, timeout) => promiseTimeout(this.client.request(req), tag, timeout || this.defaultTimeout).then(catchError), tag, transformer);
    appInfo = this._requester("app_info", appInfoTransform(this));
    callZome = this._requester("call_zome", callZomeTransform);
    createCloneCell = this._requester("create_clone_cell");
    enableCloneCell = this._requester("enable_clone_cell");
    disableCloneCell = this._requester("disable_clone_cell");
    networkInfo = this._requester("network_info");
}
const callZomeTransform = {
    input: async (request) => {
        if ("signature" in request) {
            return request;
        }
        const signedZomeCall = isLauncher
            ? await signZomeCallTauri(request)
            : await signZomeCall(request);
        return signedZomeCall;
    },
    output: (response) => decode(response),
};
const appInfoTransform = (appWs) => ({
    input: (request) => {
        if (appWs.overrideInstalledAppId) {
            return {
                installed_app_id: appWs.overrideInstalledAppId,
            };
        }
        return request;
    },
    output: (response) => response,
});
export const signZomeCall = async (request) => {
    const signingCredentialsForCell = getSigningCredentials(request.cell_id);
    if (!signingCredentialsForCell) {
        throw new Error(`cannot sign zome call: no signing credentials have been authorized for cell ${request.cell_id}`);
    }
    const unsignedZomeCallPayload = {
        cap_secret: signingCredentialsForCell.capSecret,
        cell_id: request.cell_id,
        zome_name: request.zome_name,
        fn_name: request.fn_name,
        provenance: signingCredentialsForCell.signingKey,
        payload: encode(request.payload),
        nonce: randomNonce(),
        expires_at: getNonceExpiration(),
    };
    const hashedZomeCall = await hashZomeCall(unsignedZomeCallPayload);
    const signature = nacl
        .sign(hashedZomeCall, signingCredentialsForCell.keyPair.secretKey)
        .subarray(0, nacl.sign.signatureLength);
    const signedZomeCall = {
        ...unsignedZomeCallPayload,
        signature,
    };
    return signedZomeCall;
};
//# sourceMappingURL=websocket.js.map