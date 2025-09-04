import {NextRequest, NextResponse} from "next/server";
import {signToken} from "@/lib/simpleSession";

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (!code) {
        return NextResponse.json({error: "Missing code"}, {status: 400});
    }

    const clientId = process.env.GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET || process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        return NextResponse.json({error: "Missing GitHub OAuth credentials"}, {status: 500});
    }

    try {
        const tokenRes = await fetch(GITHUB_TOKEN_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                code,
            }),
        });
        const tokenJson = await tokenRes.json();
        if (!tokenRes.ok || !tokenJson.access_token) {
            return NextResponse.json({error: "Failed to get access token", details: tokenJson}, {status: 400});
        }

        const accessToken = tokenJson.access_token as string;
        const userRes = await fetch(GITHUB_USER_URL, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
            },
        });
        const user = await userRes.json();
        if (!userRes.ok || !user || !user.id) {
            return NextResponse.json({error: "Failed to fetch user"}, {status: 400});
        }

        const token = signToken({
            id: String(user.id),
            login: user.login,
            name: user.name || user.login,
            avatarUrl: user.avatar_url || undefined,
        });

        const res = NextResponse.redirect(new URL("/documents", req.url));
        res.cookies.set("session", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
        });
        return res;
    } catch (e) {
        return NextResponse.json({error: "Unexpected error"}, {status: 500});
    }
} 