import { FunctionName, ZomeName } from "../api/index.js";
import { AgentPubKey } from "../types.js";
export declare type CapSecret = Uint8Array;
export interface CapClaim {
    tag: string;
    grantor: AgentPubKey;
    secret: CapSecret;
}
export declare enum GrantedFunctionsType {
    All = "All",
    Listed = "Listed"
}
export declare type GrantedFunctions = {
    [GrantedFunctionsType.All]: null;
} | {
    [GrantedFunctionsType.Listed]: [ZomeName, FunctionName][];
};
export interface ZomeCallCapGrant {
    tag: string;
    access: CapAccess;
    functions: GrantedFunctions;
}
export declare type CapAccess = "Unrestricted" | {
    Transferable: {
        secret: CapSecret;
    };
} | {
    Assigned: {
        secret: CapSecret;
        assignees: AgentPubKey[];
    };
};
export declare type CapGrant = {
    ChainAuthor: AgentPubKey;
} | {
    RemoteAgent: ZomeCallCapGrant;
};
