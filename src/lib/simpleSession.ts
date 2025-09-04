import {createHmac} from "crypto";

export type SessionPayload = {
    id: number | string;
    login: string;
    name?: string;
    avatarUrl?: string;
    exp: number; // ms timestamp
};

const getSecret = () => {
    const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET;
    if (!secret) throw new Error("AUTH_SECRET (or NEXTAUTH_SECRET/JWT_SECRET) is required");
    return secret;
};

const b64 = (str: string) => Buffer.from(str, "utf8").toString("base64url");
const b64d = (str: string) => Buffer.from(str, "base64url").toString("utf8");

export const signToken = (payload: Omit<SessionPayload, "exp">, ttlMs: number = 1000 * 60 * 60 * 24 * 30) => {
    const exp = Date.now() + ttlMs;
    const body = { ...payload, exp } as SessionPayload;
    const data = b64(JSON.stringify(body));
    const sig = createHmac("sha256", getSecret()).update(data).digest("base64url");
    return `${data}.${sig}`;
};

export const verifyToken = (token: string): SessionPayload | null => {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;
    const expected = createHmac("sha256", getSecret()).update(data).digest("base64url");
    if (expected !== sig) return null;
    try {
        const payload = JSON.parse(b64d(data)) as SessionPayload;
        if (Date.now() > payload.exp) return null;
        return payload;
    } catch {
        return null;
    }
}; 