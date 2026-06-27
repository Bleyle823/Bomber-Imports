export const ADMIN_SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

export function encodeSessionValue(payload: string, signature: string): string {
    return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

export function decodeSessionValue(token: string): { payload: string; signature: string } | null {
    try {
        const decoded = Buffer.from(token, "base64url").toString("utf-8");
        const separatorIndex = decoded.lastIndexOf(".");

        if (separatorIndex === -1) {
            return null;
        }

        return {
            payload: decoded.slice(0, separatorIndex),
            signature: decoded.slice(separatorIndex + 1),
        };
    } catch {
        return null;
    }
}

export function encodeSessionValueEdge(payload: string, signature: string): string {
    const value = `${payload}.${signature}`;
    return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeSessionValueEdge(token: string): { payload: string; signature: string } | null {
    try {
        const base64 = token.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        const decoded = atob(padded);
        const separatorIndex = decoded.lastIndexOf(".");

        if (separatorIndex === -1) {
            return null;
        }

        return {
            payload: decoded.slice(0, separatorIndex),
            signature: decoded.slice(separatorIndex + 1),
        };
    } catch {
        return null;
    }
}

export function isSessionPayloadValid(payload: string): boolean {
    try {
        const parsed = JSON.parse(payload) as { exp: number };
        return typeof parsed.exp === "number" && parsed.exp > Date.now();
    } catch {
        return false;
    }
}

export function createSessionPayload(): string {
    const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
    return JSON.stringify({ exp: expiresAt });
}
