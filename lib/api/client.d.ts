/// <reference types="ws" />
import { decode } from "@msgpack/msgpack";
import Websocket from "isomorphic-ws";
import Emittery from "emittery";
import { AppSignalCb } from "./app/types.js";
/**
 * A Websocket client which can make requests and receive responses,
 * as well as send and receive signals
 *
 * Uses Holochain's websocket WireMessage for communication.
 */
export declare class WsClient extends Emittery {
    socket: Websocket;
    pendingRequests: Record<number, {
        fulfill: (msg: unknown) => ReturnType<typeof decode>;
        reject: (error: Error) => void;
    }>;
    index: number;
    constructor(socket: any, signalCb?: AppSignalCb);
    emitSignal(data: any): void;
    request<Req, Res>(data: Req): Promise<Res>;
    handleResponse(msg: any): void;
    close(): Promise<void>;
    awaitClose(): Promise<void>;
    static connect(url: string, signalCb?: AppSignalCb): Promise<WsClient>;
}
