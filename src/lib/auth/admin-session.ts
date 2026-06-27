import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import {
    ADMIN_SESSION_COOKIE,
    createSessionPayload,
    decodeSessionValue,
    encodeSessionValue,
    isSessionPayloadValid,
    SESSION_MAX_AGE_SECONDS,
} from "./session-token";

function getSessionSecret(): string {
    const secret = process.env.ADMIN_SESSION_SECRET;

    if (!secret) {
        throw new Error("ADMIN_SESSION_SECRET is not configured");
    }

    return secret;
}

function signPayload(payload: string): string {
    return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
    const payload = createSessionPayload();
    return encodeSessionValue(payload, signPayload(payload));
}

export function verifySessionToken(token: string): boolean {
    const decoded = decodeSessionValue(token);

    if (!decoded) {
        return false;
    }

    const expectedSignature = signPayload(decoded.payload);
    const signatureBuffer = Buffer.from(decoded.signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedBuffer.length) {
        return false;
    }

    if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
        return false;
    }

    return isSessionPayloadValid(decoded.payload);
}

export function getAdminPassword(): string {
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
        throw new Error("ADMIN_PASSWORD is not configured");
    }

    return password;
}

export async function isAdminAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (!token) {
        return false;
    }

    return verifySessionToken(token);
}

export function getSessionCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: SESSION_MAX_AGE_SECONDS,
    };
}

export { ADMIN_SESSION_COOKIE };
