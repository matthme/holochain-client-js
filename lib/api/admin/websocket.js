import { getLauncherEnvironment } from "../../environments/launcher.js";
import { GrantedFunctionsType, } from "../../hdk/capabilities.js";
import { WsClient } from "../client.js";
import { catchError, DEFAULT_TIMEOUT, promiseTimeout, requesterTransformer, } from "../common.js";
import { generateSigningKeyPair, randomCapSecret, setSigningCredentials, } from "../zome-call-signing.js";
import { AppStatusFilter, } from "./types.js";
export class AdminWebsocket {
    client;
    defaultTimeout;
    constructor(client, defaultTimeout) {
        this.client = client;
        this.defaultTimeout =
            defaultTimeout === undefined ? DEFAULT_TIMEOUT : defaultTimeout;
    }
    static async connect(url, defaultTimeout) {
        // Check if we are in the launcher's environment, and if so, redirect the url to connect to
        const env = getLauncherEnvironment();
        if (env && env.ADMIN_INTERFACE_PORT) {
            url = `ws://127.0.0.1:${env.ADMIN_INTERFACE_PORT}`;
        }
        const wsClient = await WsClient.connect(url);
        return new AdminWebsocket(wsClient, defaultTimeout);
    }
    _requester = (tag, transformer) => requesterTransformer((req, timeout) => promiseTimeout(this.client.request(req), tag, timeout || this.defaultTimeout).then(catchError), tag, transformer);
    // the specific request/response types come from the Interface
    // which this class implements
    attachAppInterface = this._requester("attach_app_interface");
    enableApp = this._requester("enable_app");
    disableApp = this._requester("disable_app");
    startApp = this._requester("start_app");
    dumpState = this._requester("dump_state", dumpStateTransform);
    dumpFullState = this._requester("dump_full_state");
    generateAgentPubKey = this._requester("generate_agent_pub_key");
    registerDna = this._requester("register_dna");
    getDnaDefinition = this._requester("get_dna_definition");
    uninstallApp = this._requester("uninstall_app");
    installApp = this._requester("install_app");
    listDnas = this._requester("list_dnas");
    listCellIds = this._requester("list_cell_ids");
    listApps = this._requester("list_apps", listAppsTransform);
    listAppInterfaces = this._requester("list_app_interfaces");
    agentInfo = this._requester("agent_info");
    addAgentInfo = this._requester("add_agent_info");
    deleteCloneCell = this._requester("delete_clone_cell");
    grantZomeCallCapability = this._requester("grant_zome_call_capability");
    // zome call signing related methods
    /**
     * Grant a capability for signing zome calls.
     *
     * @param cellId - The cell to grant the capability for.
     * @param functions - The zome functions to grant the capability for.
     * @param signingKey - The assignee of the capability.
     * @returns The cap secret of the created capability.
     */
    grantSigningKey = async (cellId, functions, signingKey) => {
        const capSecret = randomCapSecret();
        await this.grantZomeCallCapability({
            cell_id: cellId,
            cap_grant: {
                tag: "zome-call-signing-key",
                functions,
                access: {
                    Assigned: {
                        secret: capSecret,
                        assignees: [signingKey],
                    },
                },
            },
        });
        return capSecret;
    };
    /**
     * Generate and authorize a new key pair for signing zome calls.
     *
     * @param cellId - The cell id to create the capability grant for.
     * @param functions - Zomes and functions to authorize the signing key for
     * (optional). When no functions are specified, the capability will be
     * granted for all zomes and functions.
     */
    authorizeSigningCredentials = async (cellId, functions) => {
        const [keyPair, signingKey] = generateSigningKeyPair();
        const capSecret = await this.grantSigningKey(cellId, functions || { [GrantedFunctionsType.All]: null }, signingKey);
        setSigningCredentials(cellId, { capSecret, keyPair, signingKey });
    };
}
const listAppsTransform = {
    input: (req) => {
        const args = {};
        if (req.status_filter) {
            args.status_filter = getAppStatusInApiForm(req.status_filter);
        }
        return args;
    },
    output: (res) => res,
};
const dumpStateTransform = {
    input: (req) => req,
    output: (res) => {
        return JSON.parse(res);
    },
};
function getAppStatusInApiForm(status_filter) {
    switch (status_filter) {
        case AppStatusFilter.Running:
            return {
                Running: null,
            };
        case AppStatusFilter.Enabled:
            return {
                Enabled: null,
            };
        case AppStatusFilter.Paused:
            return {
                Paused: null,
            };
        case AppStatusFilter.Disabled:
            return {
                Disabled: null,
            };
        case AppStatusFilter.Stopped:
            return {
                Stopped: null,
            };
    }
}
//# sourceMappingURL=websocket.js.map