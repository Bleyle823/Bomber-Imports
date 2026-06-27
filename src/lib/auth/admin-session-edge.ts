import {
    decodeSessionValueEdge,
    encodeSessionValueEdge,
    isSessionPayloadValid,
} from "./session-token";

async function signPayloadEdge(payload: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    return Array.from(new Uint8Array(signature))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

export async function verifySessionTokenEdge(token: string, secret: string): Promise<boolean> {
    const decoded = decodeSessionValueEdge(token);

    if (!decoded) {
        return false;
    }

    const expectedSignature = await signPayloadEdge(decoded.payload, secret);

    if (decoded.signature.length !== expectedSignature.length) {
        return false;
    }

    let mismatch = 0;

    for (let index = 0; index < decoded.signature.length; index += 1) {
        mismatch |= decoded.signature.charCodeAt(index) ^ expectedSignature.charCodeAt(index);
    }

    if (mismatch !== 0) {
        return false;
    }

    return isSessionPayloadValid(decoded.payload);
}

export { encodeSessionValueEdge };
