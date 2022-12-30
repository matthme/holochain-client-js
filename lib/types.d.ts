export declare type HoloHash = Uint8Array;
export declare type AgentPubKey = HoloHash;
export declare type DnaHash = HoloHash;
export declare type WasmHash = HoloHash;
export declare type EntryHash = HoloHash;
export declare type ActionHash = HoloHash;
export declare type AnyDhtHash = HoloHash;
export declare type KitsuneAgent = Uint8Array;
export declare type KitsuneSpace = Uint8Array;
/** Base64 hash types */
export declare type HoloHashB64 = string;
export declare type AgentPubKeyB64 = HoloHashB64;
export declare type DnaHashB64 = HoloHashB64;
export declare type WasmHashB64 = HoloHashB64;
export declare type EntryHashB64 = HoloHashB64;
export declare type ActionHashB64 = HoloHashB64;
export declare type AnyDhtHashB64 = HoloHashB64;
export declare type InstalledAppId = string;
export declare type Signature = Uint8Array;
export declare type CellId = [DnaHash, AgentPubKey];
export declare type DnaProperties = any;
export declare type RoleName = string;
export declare type InstalledCell = {
    cell_id: CellId;
    role_name: RoleName;
};
export declare type Timestamp = number;
export interface HoloHashed<T> {
    hash: HoloHash;
    content: T;
}
export interface NetworkInfo {
    fetch_queue_info: FetchQueueInfo;
}
export interface FetchQueueInfo {
    op_bytes_to_fetch: number;
    num_ops_to_fetch: number;
}
