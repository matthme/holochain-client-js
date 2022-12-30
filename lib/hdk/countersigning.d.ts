import { ActionHash, AgentPubKey, EntryHash, Signature, Timestamp } from "../types.js";
import { EntryType } from "./entry.js";
export interface CounterSigningSessionData {
    preflight_request: PreflightRequest;
    responses: Array<[CountersigningAgentState, Signature]>;
}
export interface PreflightRequest {
    app_entry_hash: EntryHash;
    signing_agents: CounterSigningAgents;
    enzyme_index: number | undefined;
    session_times: CounterSigningSessionTimes;
    action_base: ActionBase;
    preflight_bytes: PreflightBytes;
}
export interface CounterSigningSessionTimes {
    start: Timestamp;
    end: Timestamp;
}
export declare type ActionBase = {
    Create: CreateBase;
} | {
    Update: UpdateBase;
};
export interface CreateBase {
    entry_type: EntryType;
}
export interface UpdateBase {
    original_action_address: ActionHash;
    original_entry_address: EntryHash;
    entry_type: EntryType;
}
export declare type CounterSigningAgents = Array<[AgentPubKey, Array<Role>]>;
export declare type PreflightBytes = Uint8Array;
export declare type Role = number;
export interface CountersigningAgentState {
    agent_index: number;
    chain_top: ActionHash;
    action_seq: number;
}
