import { ActionHash, AgentPubKey, EntryHash } from "../types.js";
/** From https://github.com/holochain/holochain/blob/develop/crates/holo_hash/src/hash_type/primitive.rs */
export declare function fakeEntryHash(): EntryHash;
export declare function fakeAgentPubKey(): AgentPubKey;
export declare function fakeActionHash(): ActionHash;
