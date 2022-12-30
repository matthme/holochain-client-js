import { AgentPubKey, CellId, DnaProperties, InstalledAppId, InstalledCell, RoleName, Timestamp, DnaHash, NetworkInfo } from "../../types.js";
import { Requester } from "../common.js";
import { FunctionName, AppInfo, MembraneProof, NetworkSeed, ZomeName } from "../admin/index.js";
export declare type CallZomeRequestGeneric<Payload> = {
    cell_id: CellId;
    zome_name: ZomeName;
    fn_name: FunctionName;
    payload: Payload;
    provenance: AgentPubKey;
};
export declare type CallZomeRequest = CallZomeRequestGeneric<any>;
export declare type CallZomeResponseGeneric<Payload> = Payload;
export declare type CallZomeResponse = CallZomeResponseGeneric<any>;
export declare type AppInfoRequest = {
    installed_app_id: InstalledAppId;
};
export declare type AppInfoResponse = AppInfo;
export interface CreateCloneCellRequest {
    /**
     * The app id that the DNA to clone belongs to
     */
    app_id: InstalledAppId;
    /**
     * The DNA's role id to clone.
     */
    role_name: RoleName;
    /**
     * Modifiers to set for the new cell.
     * At least one of the modifiers must be set to obtain a distinct hash for
     * the clone cell's DNA.
     */
    modifiers: {
        /**
         * The network seed of a DNA is included in the computation of the DNA hash.
         * The DNA hash in turn determines the network peers and the DHT, meaning
         * that only peers with the same DNA hash of a shared DNA participate in the
         * same network and co-create the DHT. To create a separate DHT for the DNA,
         * a unique network seed can be specified.
         */
        network_seed?: NetworkSeed;
        /**
         * Any arbitrary application properties can be included in this object to
         * override the DNA properties.
         */
        properties?: DnaProperties;
        /**
         * The time used to denote the origin of the network, used to calculate
         * time windows during gossip.
         * All Action timestamps must come after this time.
         */
        origin_time?: Timestamp;
    };
    /**
     * Optionally set a proof of membership for the new cell.
     */
    membrane_proof?: MembraneProof;
    /**
     * Optionally a name for the DNA clone.
     */
    name?: string;
}
export declare type CreateCloneCellResponse = InstalledCell;
export interface DisableCloneCellRequest {
    app_id: InstalledAppId;
    clone_cell_id: RoleName | CellId;
}
export declare type DisableCloneCellResponse = void;
export declare type EnableCloneCellRequest = DisableCloneCellRequest;
export declare type EnableCloneCellResponse = CreateCloneCellResponse;
export declare type AppSignal = {
    type: string;
    data: {
        cellId: CellId;
        payload: any;
    };
};
export interface NetworkInfoRequest {
    /** The DNAs for which to get network info */
    dnas: DnaHash[];
}
export declare type NetworkInfoResponse = NetworkInfo[];
export declare type AppSignalCb = (signal: AppSignal) => void;
export declare type SignalResponseGeneric<Payload> = Payload;
export interface AppApi {
    appInfo: Requester<AppInfoRequest, AppInfoResponse>;
    callZome: Requester<CallZomeRequest, CallZomeResponse>;
    enableCloneCell: Requester<EnableCloneCellRequest, EnableCloneCellResponse>;
    disableCloneCell: Requester<DisableCloneCellRequest, DisableCloneCellResponse>;
}
