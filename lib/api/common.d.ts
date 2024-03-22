import { RoleName } from "../types.js";
export declare const DEFAULT_TIMEOUT = 60000;
/**
 * @public
 */
export type Transformer<ReqI, ReqO, ResI, ResO> = {
    input: (req: ReqI) => ReqO;
    output: (res: ResI) => ResO;
};
/**
 * @public
 */
export type Requester<Req, Res> = (req: Req, timeout?: number) => Promise<Res>;
/**
 * @public
 */
export type RequesterUnit<Res> = () => Promise<Res>;
/**
 * @public
 */
export type Tagged<T> = {
    type: {
        [tag: string]: null;
    };
    data: T;
};
/**
 * Take a Requester function which deals with tagged requests and responses,
 * and return a Requester which deals only with the inner data types, also
 * with the optional Transformer applied to further modify the input and output.
 *
 * @public
 */
export declare const requesterTransformer: <ReqI, ReqO, ResI, ResO>(requester: Requester<Tagged<ReqO>, Tagged<ResI>>, tag: string, transform?: Transformer<ReqI, ReqO, ResI, ResO>) => (req: ReqI, timeout?: number) => Promise<ResO>;
/**
 * Error thrown when response from Holochain is an error.
 *
 * @public
 */
export declare class HolochainError extends Error {
    constructor(name: string, message: string);
}
export declare const catchError: (res: any) => Promise<any>;
export declare const promiseTimeout: (promise: Promise<unknown>, tag: string, ms: number) => Promise<unknown>;
/**
 * Check if a cell's role name is a valid clone id.
 *
 * @param roleName - The role name to check.
 *
 * @public
 */
export declare const isCloneId: (roleName: RoleName) => boolean;
/**
 * Parse a clone id and get the role name part of it.
 *
 * @param roleName - The role name to parse.
 * @public
 */
export declare const getBaseRoleNameFromCloneId: (roleName: RoleName) => string;
/**
 * Identifier of a clone cell, composed of the DNA's role id and the index
 * of the clone, starting at 0.
 *
 * Example: `profiles.0`
 *
 * @public
 */
export declare class CloneId {
    private readonly roleName;
    private readonly index;
    constructor(roleName: RoleName, index: number);
    /**
     * Parse a role id of a clone cell to obtain a clone id instance.
     * @param roleName - Role id to parse.
     * @returns A clone id instance.
     */
    static fromRoleName(roleName: RoleName): CloneId;
    toString(): string;
    getBaseRoleName(): string;
}
/**
 * Options for a Websocket connection.
 *
 * @public
 */
export interface WebsocketConnectionOptions {
    /**
     * The `ws://` URL of the Websocket server to connect to. Not required when connecting to App API from a Launcher or Kangaroo environment.
     */
    url?: URL;
    /**
     * Options to pass to the underlying websocket connection.
     */
    wsClientOptions?: WsClientOptions;
    /**
     * Timeout to default to for all operations.
     */
    defaultTimeout?: number;
}
export interface WsClientOptions {
    origin: string | undefined;
}
