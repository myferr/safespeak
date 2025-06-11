import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const tunnelUrl = process.env.TUNNEL;
  if (!tunnelUrl) {
    return NextResponse.json(
      { error: "Tunnel URL not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const message = searchParams.get("message");
  const showMessage = searchParams.get("showMessage");

  if (!message || message.trim() === "") {
    return NextResponse.json(
      { error: "Missing 'message' query parameter" },
      { status: 400 }
    );
  }

  try {
    // Build backend URL with query params
    const url = new URL(`${tunnelUrl.replace(/\/$/, "")}/api`);
    url.searchParams.append("message", message);
    if (showMessage === "true") {
      url.searchParams.append("showMessage", "true");
    }

    const response = await axios.get(url.toString(), { timeout: 5000 });

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch from backend" },
      { status: 500 }
    );
  }
}
