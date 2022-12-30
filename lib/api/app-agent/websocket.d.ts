import Emittery, { UnsubscribeFunction } from "emittery";
import { AgentPubKey, InstalledAppId, RoleName } from "../../types.js";
import { AppInfo, AppInfoResponse, AppWebsocket, CallZomeResponse, CreateCloneCellResponse, DisableCloneCellResponse, EnableCloneCellResponse } from "../index.js";
import { AppAgentCallZomeRequest, AppAgentClient, AppAgentEvents, AppCreateCloneCellRequest, AppDisableCloneCellRequest, AppEnableCloneCellRequest } from "./types.js";
export declare class AppAgentWebsocket implements AppAgentClient {
    myPubKey: AgentPubKey;
    readonly appWebsocket: AppWebsocket;
    installedAppId: InstalledAppId;
    cachedAppInfo?: AppInfo;
    readonly emitter: Emittery<AppAgentEvents>;
    private constructor();
    appInfo(): Promise<AppInfoResponse>;
    static connect(appWebsocket: AppWebsocket, installedAppId: InstalledAppId): Promise<AppAgentWebsocket>;
    getCellIdFromRoleName(roleName: RoleName, appInfo: AppInfo): import("../../types.js").CellId;
    callZome(request: AppAgentCallZomeRequest, timeout?: number): Promise<CallZomeResponse>;
    createCloneCell(args: AppCreateCloneCellRequest): Promise<CreateCloneCellResponse>;
    enableCloneCell(args: AppEnableCloneCellRequest): Promise<EnableCloneCellResponse>;
    disableCloneCell(args: AppDisableCloneCellRequest): Promise<DisableCloneCellResponse>;
    on<Name extends keyof AppAgentEvents>(eventName: Name | readonly Name[], listener: (eventData: AppAgentEvents[Name]) => void | Promise<void>): UnsubscribeFunction;
}
