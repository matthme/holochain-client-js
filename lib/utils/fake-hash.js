import { randomByteArray } from "../api/zome-call-signing.js";
/** From https://github.com/holochain/holochain/blob/develop/crates/holo_hash/src/hash_type/primitive.rs */
export function fakeEntryHash() {
    return new Uint8Array([0x84, 0x21, 0x24, ...randomByteArray(36)]);
}
export function fakeAgentPubKey() {
    return new Uint8Array([0x84, 0x20, 0x24, ...randomByteArray(36)]);
}
export function fakeActionHash() {
    return new Uint8Array([0x84, 0x29, 0x24, ...randomByteArray(36)]);
}
//# sourceMappingURL=fake-hash.js.map