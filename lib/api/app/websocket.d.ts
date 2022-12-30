import Emittery from "emittery";
import { CapSecret } from "../../hdk/capabilities.js";
import { InstalledAppId } from "../../types.js";
import { WsClient } from "../client.js";
import { Requester, Transformer } from "../common.js";
import { Nonce256Bit } from "../zome-call-signing.js";
import { AppApi, AppInfoRequest, AppInfoResponse, AppSignalCb, CallZomeRequest, CallZomeResponse, CreateCloneCellRequest, CreateCloneCellResponse, DisableCloneCellRequest, DisableCloneCellResponse, EnableCloneCellRequest, EnableCloneCellResponse, NetworkInfoRequest, NetworkInfoResponse } from "./types.js";
export declare class AppWebsocket extends Emittery implements AppApi {
    readonly client: WsClient;
    defaultTimeout: number;
    overrideInstalledAppId?: InstalledAppId;
    private constructor();
    static connect(url: string, defaultTimeout?: number, signalCb?: AppSignalCb): Promise<AppWebsocket>;
    _requester: <ReqI, ReqO, ResI, ResO>(tag: string, transformer?: Transformer<ReqI, ReqO, ResI, ResO> | undefined) => (req: ReqI, timeout?: number | undefined) => Promise<ResO>;
    appInfo: Requester<AppInfoRequest, AppInfoResponse>;
    callZome: Requester<CallZomeRequest | CallZomeRequestSigned, CallZomeResponse>;
    createCloneCell: Requester<CreateCloneCellRequest, CreateCloneCellResponse>;
    enableCloneCell: Requester<EnableCloneCellRequest, EnableCloneCellResponse>;
    disableCloneCell: Requester<DisableCloneCellRequest, DisableCloneCellResponse>;
    networkInfo: Requester<NetworkInfoRequest, NetworkInfoResponse>;
}
export interface CallZomeRequestUnsigned extends CallZomeRequest {
    cap_secret: CapSecret | null;
    nonce: Nonce256Bit;
    expires_at: number;
}
export interface CallZomeRequestSigned extends CallZomeRequestUnsigned {
    signature: Uint8Array;
}
export declare const signZomeCall: (request: CallZomeRequest) => Promise<CallZomeRequestSigned>;
