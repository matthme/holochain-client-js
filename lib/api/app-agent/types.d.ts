import { UnsubscribeFunction } from "emittery";
import { DisableCloneCellResponse, CreateCloneCellRequest, CreateCloneCellResponse } from "../index.js";
import { AgentPubKey, RoleName } from "../../index.js";
import { AppInfoResponse, AppSignal, DisableCloneCellRequest, CallZomeRequest, EnableCloneCellRequest, EnableCloneCellResponse, CallZomeRequestSigned } from "../app/index.js";
export declare type NonProvenanceCallZomeRequest = Omit<CallZomeRequest, "provenance">;
export declare type RoleNameCallZomeRequest = Omit<NonProvenanceCallZomeRequest, "cell_id"> & {
    role_name: RoleName;
};
export declare type RoleNameCallZomeRequestSigned = Omit<CallZomeRequestSigned, "cell_id"> & {
    role_name: RoleName;
};
export declare type AppAgentCallZomeRequest = NonProvenanceCallZomeRequest | RoleNameCallZomeRequest | CallZomeRequestSigned | RoleNameCallZomeRequestSigned;
export declare type AppCreateCloneCellRequest = Omit<CreateCloneCellRequest, "app_id">;
export declare type AppEnableCloneCellRequest = Omit<EnableCloneCellRequest, "app_id">;
export declare type AppDisableCloneCellRequest = Omit<DisableCloneCellRequest, "app_id">;
export interface AppAgentEvents {
    signal: AppSignal;
}
export interface AppAgentClient {
    callZome(args: AppAgentCallZomeRequest, timeout?: number): Promise<any>;
    on<Name extends keyof AppAgentEvents>(eventName: Name | readonly Name[], listener: (eventData: AppAgentEvents[Name]) => void | Promise<void>): UnsubscribeFunction;
    appInfo(): Promise<AppInfoResponse>;
    myPubKey: AgentPubKey;
    createCloneCell(args: AppCreateCloneCellRequest): Promise<CreateCloneCellResponse>;
    enableCloneCell(args: AppEnableCloneCellRequest): Promise<EnableCloneCellResponse>;
    disableCloneCell(args: AppDisableCloneCellRequest): Promise<DisableCloneCellResponse>;
}
