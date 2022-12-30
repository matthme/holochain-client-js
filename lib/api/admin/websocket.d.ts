import { CapSecret, GrantedFunctions } from "../../hdk/capabilities.js";
import type { AgentPubKey, CellId } from "../../types.js";
import { WsClient } from "../client.js";
import { Requester, Transformer } from "../common.js";
import { AddAgentInfoRequest, AddAgentInfoResponse, AdminApi, AgentInfoRequest, AgentInfoResponse, AttachAppInterfaceRequest, AttachAppInterfaceResponse, DeleteCloneCellRequest, DeleteCloneCellResponse, DisableAppRequest, DisableAppResponse, DumpFullStateRequest, DumpFullStateResponse, DumpStateRequest, DumpStateResponse, EnableAppRequest, EnableAppResponse, GenerateAgentPubKeyRequest, GenerateAgentPubKeyResponse, GetDnaDefinitionRequest, GetDnaDefinitionResponse, GrantZomeCallCapabilityRequest, GrantZomeCallCapabilityResponse, InstallAppRequest, InstallAppResponse, ListAppInterfacesRequest, ListAppInterfacesResponse, ListAppsRequest, ListAppsResponse, ListCellIdsRequest, ListCellIdsResponse, ListDnasRequest, ListDnasResponse, RegisterDnaRequest, RegisterDnaResponse, StartAppRequest, StartAppResponse, UninstallAppRequest, UninstallAppResponse } from "./types.js";
export declare class AdminWebsocket implements AdminApi {
    readonly client: WsClient;
    defaultTimeout: number;
    private constructor();
    static connect(url: string, defaultTimeout?: number): Promise<AdminWebsocket>;
    _requester: <ReqO, ReqI, ResI, ResO>(tag: string, transformer?: Transformer<ReqO, ReqI, ResI, ResO> | undefined) => (req: ReqO, timeout?: number | undefined) => Promise<ResO>;
    attachAppInterface: Requester<AttachAppInterfaceRequest, AttachAppInterfaceResponse>;
    enableApp: Requester<EnableAppRequest, EnableAppResponse>;
    disableApp: Requester<DisableAppRequest, DisableAppResponse>;
    startApp: Requester<StartAppRequest, StartAppResponse>;
    dumpState: Requester<DumpStateRequest, DumpStateResponse>;
    dumpFullState: Requester<DumpFullStateRequest, DumpFullStateResponse>;
    generateAgentPubKey: Requester<GenerateAgentPubKeyRequest, GenerateAgentPubKeyResponse>;
    registerDna: Requester<RegisterDnaRequest, RegisterDnaResponse>;
    getDnaDefinition: Requester<GetDnaDefinitionRequest, GetDnaDefinitionResponse>;
    uninstallApp: Requester<UninstallAppRequest, UninstallAppResponse>;
    installApp: Requester<InstallAppRequest, InstallAppResponse>;
    listDnas: Requester<ListDnasRequest, ListDnasResponse>;
    listCellIds: Requester<ListCellIdsRequest, ListCellIdsResponse>;
    listApps: Requester<ListAppsRequest, ListAppsResponse>;
    listAppInterfaces: Requester<ListAppInterfacesRequest, ListAppInterfacesResponse>;
    agentInfo: Requester<AgentInfoRequest, AgentInfoResponse>;
    addAgentInfo: Requester<AddAgentInfoRequest, AddAgentInfoResponse>;
    deleteCloneCell: Requester<DeleteCloneCellRequest, DeleteCloneCellResponse>;
    grantZomeCallCapability: Requester<GrantZomeCallCapabilityRequest, GrantZomeCallCapabilityResponse>;
    /**
     * Grant a capability for signing zome calls.
     *
     * @param cellId - The cell to grant the capability for.
     * @param functions - The zome functions to grant the capability for.
     * @param signingKey - The assignee of the capability.
     * @returns The cap secret of the created capability.
     */
    grantSigningKey: (cellId: CellId, functions: GrantedFunctions, signingKey: AgentPubKey) => Promise<CapSecret>;
    /**
     * Generate and authorize a new key pair for signing zome calls.
     *
     * @param cellId - The cell id to create the capability grant for.
     * @param functions - Zomes and functions to authorize the signing key for
     * (optional). When no functions are specified, the capability will be
     * granted for all zomes and functions.
     */
    authorizeSigningCredentials: (cellId: CellId, functions?: GrantedFunctions) => Promise<void>;
}
