import {NextRequest, NextResponse} from "next/server";
import {verifyToken} from "@/lib/simpleSession";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("session")?.value;
    if (!token) return NextResponse.json({user: null});
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({user: null});
    return NextResponse.json({user: payload});
} 