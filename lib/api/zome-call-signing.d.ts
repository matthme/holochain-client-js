import nacl from "tweetnacl";
import { CapSecret } from "../hdk/capabilities.js";
import { AgentPubKey, CellId } from "../types.js";
export declare type Nonce256Bit = Uint8Array;
interface SigningCredentials {
    capSecret: CapSecret;
    keyPair: nacl.SignKeyPair;
    signingKey: AgentPubKey;
}
/**
 * Get credentials for signing zome calls.
 *
 * @param cellId - Cell id to get credentials of.
 * @returns The keys and cap secret required for signing a zome call.
 */
export declare const getSigningCredentials: (cellId: CellId) => SigningCredentials | undefined;
/**
 * Set credentials for signing zome calls.
 *
 * @param cellId - Cell id to set credentials for.
 * @param cellId - Cell id to set credentials for.
 */
export declare const setSigningCredentials: (cellId: CellId, credentials: SigningCredentials) => void;
/**
 * Generates a key pair for signing zome calls.
 *
 * @returns The signing key pair and an agent pub key based on the public key.
 */
export declare const generateSigningKeyPair: () => [
    nacl.SignKeyPair,
    AgentPubKey
];
export declare const randomCapSecret: () => CapSecret;
export declare const randomNonce: () => Nonce256Bit;
export declare const randomByteArray: (length: number) => Uint8Array;
export declare const getNonceExpiration: () => number;
export {};
