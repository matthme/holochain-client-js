import { Base64 } from "js-base64";
export function decodeHashFromBase64(hash) {
    return Base64.toUint8Array(hash.slice(1));
}
export function encodeHashToBase64(hash) {
    return `u${Base64.fromUint8Array(hash, true)}`;
}
//# sourceMappingURL=base64.js.map