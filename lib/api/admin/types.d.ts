/// <reference types="node" />
import { Action, DhtOp, Entry, ZomeCallCapGrant } from "../../hdk/index.js";
import { ActionHash, AgentPubKey, CellId, DnaHash, DnaProperties, HoloHash, HoloHashB64, InstalledAppId, KitsuneAgent, KitsuneSpace, RoleName, Signature, Timestamp, WasmHash } from "../../types.js";
import { Requester } from "../common.js";
import { DisableCloneCellRequest } from "../index.js";
export declare type AttachAppInterfaceRequest = {
    port: number;
};
export declare type AttachAppInterfaceResponse = {
    port: number;
};
export declare type EnableAppRequest = {
    installed_app_id: InstalledAppId;
};
export declare type EnableAppResponse = {
    app: AppInfo;
    errors: Array<[CellId, string]>;
};
export declare type DeactivationReason = {
    never_activated: null;
} | {
    normal: null;
} | {
    quarantined: {
        error: string;
    };
};
export declare type PausedAppReason = {
    error: string;
};
export declare type DisabledAppReason = {
    never_started: null;
} | {
    user: null;
} | {
    error: string;
};
export declare type InstalledAppInfoStatus = {
    paused: {
        reason: PausedAppReason;
    };
} | {
    disabled: {
        reason: DisabledAppReason;
    };
} | {
    running: null;
};
export interface StemCell {
    dna: DnaHash;
    name?: string;
    dna_modifiers: DnaModifiers;
}
export interface Cell {
    cell_id: CellId;
    clone_id?: RoleName;
    dna_modifiers: DnaModifiers;
    name: string;
    enabled: boolean;
}
export declare enum CellType {
    Provisioned = "Provisioned",
    Cloned = "Cloned",
    Stem = "Stem"
}
export declare type CellInfo = {
    [CellType.Provisioned]: Cell;
} | {
    [CellType.Cloned]: Cell;
} | {
    [CellType.Stem]: StemCell;
};
export declare type AppInfo = {
    installed_app_id: InstalledAppId;
    cell_info: Record<RoleName, Array<CellInfo>>;
    status: InstalledAppInfoStatus;
};
export declare type MembraneProof = Buffer;
export declare type DisableAppRequest = {
    installed_app_id: InstalledAppId;
};
export declare type DisableAppResponse = null;
export declare type StartAppRequest = {
    installed_app_id: InstalledAppId;
};
export declare type StartAppResponse = boolean;
export declare type DumpStateRequest = {
    cell_id: CellId;
};
export declare type DumpStateResponse = any;
export declare type DumpFullStateRequest = {
    cell_id: CellId;
    dht_ops_cursor: number | undefined;
};
export declare type DumpFullStateResponse = FullStateDump;
export declare type GenerateAgentPubKeyRequest = void;
export declare type GenerateAgentPubKeyResponse = AgentPubKey;
export declare type RegisterDnaRequest = {
    modifiers?: {
        network_seed?: string;
        properties?: DnaProperties;
    };
} & DnaSource;
export declare type RegisterDnaResponse = HoloHash;
export declare type DnaModifiers = {
    network_seed: NetworkSeed;
    properties: DnaProperties;
    origin_time: Timestamp;
};
export declare type FunctionName = string;
export declare type ZomeName = string;
export declare type ZomeDefinition = [
    ZomeName,
    {
        wasm_hash: WasmHash;
        dependencies: ZomeName[];
    }
];
export declare type IntegrityZome = ZomeDefinition;
export declare type CoordinatorZome = ZomeDefinition;
export declare type DnaDefinition = {
    name: string;
    modifiers: DnaModifiers;
    integrity_zomes: IntegrityZome[];
    coordinator_zomes: CoordinatorZome[];
};
export declare type GetDnaDefinitionRequest = DnaHash;
export declare type GetDnaDefinitionResponse = DnaDefinition;
export declare type UninstallAppRequest = {
    installed_app_id: InstalledAppId;
};
export declare type UninstallAppResponse = null;
export declare type ResourceBytes = Buffer;
export declare type ResourceMap = {
    [key: string]: ResourceBytes;
};
export declare type CellProvisioning = {
    create: {
        deferred: boolean;
    };
} | {
    create_clone: {
        deferred: boolean;
    };
} | {
    use_existing: {
        deferred: boolean;
    };
} | {
    create_if_no_exists: {
        deferred: boolean;
    };
} | {
    disabled: Record<string, never>;
};
export declare type DnaVersionSpec = Array<HoloHashB64>;
export declare type DnaVersionFlexible = {
    singleton: HoloHashB64;
} | {
    multiple: DnaVersionSpec;
};
export declare type AppRoleDnaManifest = {
    location?: Location;
    properties?: DnaProperties;
    network_seed?: NetworkSeed;
    version?: DnaVersionFlexible;
};
export declare type AppRoleManifest = {
    name: RoleName;
    provisioning?: CellProvisioning;
    dna: AppRoleDnaManifest;
};
export declare type AppManifest = {
    manifest_version: string;
    name: string;
    description?: string;
    roles: Array<AppRoleManifest>;
};
export declare type AppBundle = {
    manifest: AppManifest;
    resources: ResourceMap;
};
export declare type AppBundleSource = {
    bundle: AppBundle;
} | {
    path: string;
};
export declare type NetworkSeed = string;
export declare type InstallAppRequest = {
    agent_key: AgentPubKey;
    installed_app_id?: InstalledAppId;
    membrane_proofs: {
        [key: string]: MembraneProof;
    };
    network_seed?: NetworkSeed;
} & AppBundleSource;
export declare type InstallAppResponse = AppInfo;
export declare type ListDnasRequest = void;
export declare type ListDnasResponse = Array<string>;
export declare type ListCellIdsRequest = void;
export declare type ListCellIdsResponse = Array<CellId>;
export declare type ListActiveAppsRequest = void;
export declare type ListActiveAppsResponse = Array<InstalledAppId>;
export declare enum AppStatusFilter {
    Enabled = "enabled",
    Disabled = "disabled",
    Running = "running",
    Stopped = "stopped",
    Paused = "paused"
}
export declare type ListAppsRequest = {
    status_filter?: AppStatusFilter;
};
export declare type ListAppsResponse = Array<AppInfo>;
export declare type ListAppInterfacesRequest = void;
export declare type ListAppInterfacesResponse = Array<number>;
export declare type AgentInfoSigned = any;
export declare type AgentInfoRequest = {
    cell_id: CellId | null;
};
export declare type AgentInfoResponse = Array<AgentInfoSigned>;
export declare type AddAgentInfoRequest = {
    agent_infos: Array<AgentInfoSigned>;
};
export declare type AddAgentInfoResponse = any;
export declare type DeleteCloneCellRequest = DisableCloneCellRequest;
export declare type DeleteCloneCellResponse = void;
export interface GrantZomeCallCapabilityRequest {
    cell_id: CellId;
    cap_grant: ZomeCallCapGrant;
}
export declare type GrantZomeCallCapabilityResponse = void;
export interface AdminApi {
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
}
export declare type InstallAppDnaPayload = {
    hash: HoloHash;
    role_name: RoleName;
    membrane_proof?: MembraneProof;
};
export declare type ZomeLocation = {
    bundled: string;
} | {
    path: string;
} | {
    url: string;
};
export declare type ZomeManifest = {
    name: string;
    hash?: string;
} & ZomeLocation;
export declare type DnaManifest = {
    manifest_version: string;
    name: string;
    network_seed?: NetworkSeed;
    properties?: DnaProperties;
    zomes: Array<ZomeManifest>;
};
export declare type DnaBundle = {
    manifest: DnaManifest;
    resources: ResourceMap;
};
export declare type DnaSource = {
    hash: HoloHash;
} | {
    path: string;
} | {
    bundle: DnaBundle;
};
export declare type Zomes = Array<[string, {
    wasm_hash: Array<HoloHash>;
}]>;
export declare type WasmCode = [HoloHash, {
    code: Array<number>;
}];
export interface AgentInfoDump {
    kitsune_agent: KitsuneAgent;
    kitsune_space: KitsuneSpace;
    dump: string;
}
export interface P2pAgentsDump {
    this_agent_info: AgentInfoDump | undefined;
    this_dna: [DnaHash, KitsuneSpace] | undefined;
    this_agent: [AgentPubKey, KitsuneAgent] | undefined;
    peers: Array<AgentInfoDump>;
}
export interface FullIntegrationStateDump {
    validation_limbo: Array<DhtOp>;
    integration_limbo: Array<DhtOp>;
    integrated: Array<DhtOp>;
    dht_ops_cursor: number;
}
export interface SourceChainJsonRecord {
    signature: Signature;
    action_address: ActionHash;
    action: Action;
    entry: Entry | undefined;
}
export interface SourceChainJsonDump {
    records: Array<SourceChainJsonRecord>;
    published_ops_count: number;
}
export interface FullStateDump {
    peer_dump: P2pAgentsDump;
    source_chain_dump: SourceChainJsonDump;
    integration_dump: FullIntegrationStateDump;
}
