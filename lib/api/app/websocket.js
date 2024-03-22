import { hashZomeCall } from "@holochain/serialization";
import { decode, encode } from "@msgpack/msgpack";
import _sodium from "libsodium-wrappers";
import Emittery from "emittery";
import { getLauncherEnvironment, signZomeCallTauri, signZomeCallElectron, getHostZomeCallSigner, } from "../../environments/launcher.js";
import { encodeHashToBase64 } from "../../utils/base64.js";
import { WsClient } from "../client.js";
import { DEFAULT_TIMEOUT, catchError, promiseTimeout, requesterTransformer, } from "../common.js";
import { getNonceExpiration, getSigningCredentials, randomNonce, } from "../zome-call-signing.js";
/**
 * A class to establish a websocket connection to an App interface of a
 * Holochain conductor.
 *
 * @public
 */
export class AppWebsocket extends Emittery {
    client;
    defaultTimeout;
    overrideInstalledAppId;
    constructor(client, defaultTimeout, overrideInstalledAppId) {
        super();
        // Ensure all super methods are bound to this instance because Emittery relies on `this` being the instance.
        // Please retain until the upstream is fixed https://github.com/sindresorhus/emittery/issues/86.
        Object.getOwnPropertyNames(Emittery.prototype).forEach((name) => {
            const to_bind = this[name];
            if (typeof to_bind === "function") {
                this[name] =
                    to_bind.bind(this);
            }
        });
        this.client = client;
        this.defaultTimeout =
            defaultTimeout === undefined ? DEFAULT_TIMEOUT : defaultTimeout;
        this.overrideInstalledAppId = overrideInstalledAppId;
    }
    /**
     * Instance factory for creating AppWebsockets.
     *
     * @param options - {@link (WebsocketConnectionOptions:interface)}
     * @returns A new instance of an AppWebsocket.
     */
    static async connect(options = {}) {
        // Check if we are in the launcher's environment, and if so, redirect the url to connect to
        const env = getLauncherEnvironment();
        if (env?.APP_INTERFACE_PORT) {
            options.url = new URL(`ws://127.0.0.1:${env.APP_INTERFACE_PORT}`);
        }
        if (!options.url) {
            throw new Error("Unable to connect to App Websocket: No url provided and not in a Launcher environment.");
        }
        const wsClient = await WsClient.connect(options.url, options.wsClientOptions);
        const appWebsocket = new AppWebsocket(wsClient, options.defaultTimeout, env?.INSTALLED_APP_ID);
        wsClient.on("signal", (signal) => appWebsocket.emit("signal", signal));
        return appWebsocket;
    }
    _requester(tag, transformer) {
        return requesterTransformer((req, timeout) => promiseTimeout(this.client.request(req), tag, timeout || this.defaultTimeout).then(catchError), tag, transformer);
    }
    /**
     * Request the app's info, including all cell infos.
     *
     * @returns The app's {@link AppInfo}.
     */
    appInfo = this._requester("app_info", appInfoTransform(this));
    /**
     * Call a zome.
     *
     * @param request - The zome call arguments.
     * @param timeout - A timeout to override the default.
     * @returns The zome call's response.
     */
    callZome = this._requester("call_zome", callZomeTransform);
    /**
     * Clone an existing provisioned cell.
     *
     * @param args - Specify the cell to clone.
     * @returns The created clone cell.
     */
    createCloneCell = this._requester("create_clone_cell");
    /**
     * Enable a disabled clone cell.
     *
     * @param args - Specify the clone cell to enable.
     * @returns The enabled clone cell.
     */
    enableCloneCell = this._requester("enable_clone_cell");
    /**
     * Disable an enabled clone cell.
     *
     * @param args - Specify the clone cell to disable.
     */
    disableCloneCell = this._requester("disable_clone_cell");
    /**
     * Request network info about gossip status.
     */
    networkInfo = this._requester("network_info");
}
const callZomeTransform = {
    input: async (request) => {
        if ("signature" in request) {
            return request;
        }
        const hostSigner = getHostZomeCallSigner();
        if (hostSigner) {
            return hostSigner.signZomeCall(request);
        }
        else {
            const env = getLauncherEnvironment();
            if (!env) {
                return signZomeCall(request);
            }
            if (env.FRAMEWORK === "electron") {
                return signZomeCallElectron(request);
            }
            return signZomeCallTauri(request);
        }
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
/**
 * @public
 */
export const signZomeCall = async (request) => {
    const signingCredentialsForCell = getSigningCredentials(request.cell_id);
    if (!signingCredentialsForCell) {
        throw new Error(`cannot sign zome call: no signing credentials have been authorized for cell [${encodeHashToBase64(request.cell_id[0])}, ${encodeHashToBase64(request.cell_id[1])}]`);
    }
    const unsignedZomeCallPayload = {
        cap_secret: signingCredentialsForCell.capSecret,
        cell_id: request.cell_id,
        zome_name: request.zome_name,
        fn_name: request.fn_name,
        provenance: signingCredentialsForCell.signingKey,
        payload: encode(request.payload),
        nonce: await randomNonce(),
        expires_at: getNonceExpiration(),
    };
    const hashedZomeCall = await hashZomeCall(unsignedZomeCallPayload);
    await _sodium.ready;
    const sodium = _sodium;
    const signature = sodium
        .crypto_sign(hashedZomeCall, signingCredentialsForCell.keyPair.privateKey)
        .subarray(0, sodium.crypto_sign_BYTES);
    const signedZomeCall = {
        ...unsignedZomeCallPayload,
        signature,
    };
    return signedZomeCall;
};