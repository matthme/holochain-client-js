/// <reference types="ws" />
import Emittery from "emittery";
import IsoWebSocket from "isomorphic-ws";
import { WsClientOptions } from "./common.js";
/**
 * A WebSocket client which can make requests and receive responses,
 * as well as send and receive signals.
 *
 * Uses Holochain's WireMessage for communication.
 *
 * @public
 */
export declare class WsClient extends Emittery {
    socket: IsoWebSocket;
    url: URL | undefined;
    private pendingRequests;
    private index;
    constructor(socket: IsoWebSocket, url?: URL);
    private setupSocket;
    /**
     * Instance factory for creating WsClients.
     *
     * @param url - The WebSocket URL to connect to.
     * @returns An new instance of the WsClient.
     */
    static connect(url: URL, options?: WsClientOptions): Promise<WsClient>;
    /**
     * Sends data as a signal.
     *
     * @param data - Data to send.
     */
    emitSignal(data: unknown): void;
    /**
     * Send requests to the connected websocket.
     *
     * @param request - The request to send over the websocket.
     * @returns
     */
    request<Response>(request: unknown): Promise<Response>;
    private sendMessage;
    private handleResponse;
    /**
     * Close the websocket connection.
     */
    close(code?: number): Promise<CloseEvent>;
}
export { IsoWebSocket };