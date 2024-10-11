import { type NextRequest } from "next/server";
import x from "../../../lib/x";

export async function GET(req: NextRequest) {
    if (req.nextUrl.searchParams.has("url")) {
        const url = req.nextUrl.searchParams.get("url");
        if (url) {
            const twtIdMatch = url.match(/\/status\/(\d+)/);
            const twtId = twtIdMatch ? twtIdMatch[1] : "";
            const data = await x(twtId);
            return Response.json(
                { status: 200, msg: "ok.", data },
                { status: 200 },
            );
        } else {
            return Response.json(
                { status: 400, msg: "Please provide a Tweet URL" },
                { status: 400 },
            );
        }
    } else {
        return Response.json(
            { status: 200, msg: "Please provide a Tweet URL" },
            { status: 400 },
        );
    }
}
