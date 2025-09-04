import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const res = NextResponse.json({ok: true});
    res.cookies.set("session", "", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
    return res;
} 