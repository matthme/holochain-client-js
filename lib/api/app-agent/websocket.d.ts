import Emittery, { UnsubscribeFunction } from "emittery";
import { AgentPubKey, CellId, InstalledAppId, RoleName } from "../../types.js";
import { AppInfo } from "../admin/types.js";
import { AppSignalCb, CallZomeResponse, CreateCloneCellResponse, DisableCloneCellResponse, EnableCloneCellResponse, NetworkInfoResponse } from "../app/types.js";
import { AppWebsocket } from "../app/websocket.js";
import { WebsocketConnectionOptions } from "../common.js";
import { AppAgentCallZomeRequest, AppAgentClient, AppAgentEvents, AppAgentNetworkInfoRequest, AppCreateCloneCellRequest, AppDisableCloneCellRequest, AppEnableCloneCellRequest } from "./types.js";
/**
 * A class to establish a websocket connection to an App interface, for a
 * specific agent and app.
 *
 * @public
 */
export declare class AppAgentWebsocket implements AppAgentClient {
    readonly appWebsocket: AppWebsocket;
    installedAppId: InstalledAppId;
    cachedAppInfo?: AppInfo | null;
    myPubKey: AgentPubKey;
    readonly emitter: Emittery<AppAgentEvents>;
    private constructor();
    /**
     * Request the app's info, including all cell infos.
     *
     * @returns The app's {@link AppInfo}.
     */
    appInfo(): Promise<AppInfo>;
    /**
     * Instance factory for creating AppAgentWebsockets.
     *
     * @param installed_app_id - ID of the App to link to.
     * @param options - {@link (WebsocketConnectionOptions:interface)}
     * @returns A new instance of an AppAgentWebsocket.
     */
    static connect(installed_app_id: InstalledAppId, options?: WebsocketConnectionOptions): Promise<AppAgentWebsocket>;
    /**
     * Get a cell id by its role name or clone id.
     *
     * @param roleName - The role name or clone id of the cell.
     * @param appInfo - The app info containing all cell infos.
     * @returns The cell id or throws an error if not found.
     */
    getCellIdFromRoleName(roleName: RoleName, appInfo: AppInfo): CellId;
    /**
     * Call a zome.
     *
     * @param request - The zome call arguments.
     * @param timeout - A timeout to override the default.
     * @returns The zome call's response.
     */
    callZome(request: AppAgentCallZomeRequest, timeout?: number): Promise<CallZomeResponse>;
    /**
     * Clone an existing provisioned cell.
     *
     * @param args - Specify the cell to clone.
     * @returns The created clone cell.
     */
    createCloneCell(args: AppCreateCloneCellRequest): Promise<CreateCloneCellResponse>;
    /**
     * Enable a disabled clone cell.
     *
     * @param args - Specify the clone cell to enable.
     * @returns The enabled clone cell.
     */
    enableCloneCell(args: AppEnableCloneCellRequest): Promise<EnableCloneCellResponse>;
    /**
     * Disable an enabled clone cell.
     *
     * @param args - Specify the clone cell to disable.
     */
    disableCloneCell(args: AppDisableCloneCellRequest): Promise<DisableCloneCellResponse>;
    /**
     * Request network info about gossip status.
     *  @param args - Specify the DNAs for which you want network info
     *  @returns Network info for the specified DNAs
     */
    networkInfo(args: AppAgentNetworkInfoRequest): Promise<NetworkInfoResponse>;
    /**
     * Register an event listener for signals.
     *
     * @param eventName - Event name to listen to (currently only "signal").
     * @param listener - The function to call when event is triggered.
     * @returns A function to unsubscribe the event listener.
     */
    on<Name extends keyof AppAgentEvents>(eventName: Name | readonly Name[], listener: AppSignalCb): UnsubscribeFunction;
    private containsCell;
}