import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  // Simulate an error condition
  const serviceIsHealthy = true; // Change to true for normal operation

  if (!serviceIsHealthy) {
    return NextResponse.json(
      {
        status: "error",
        service: "brewscholar-front-end",
        message: "Service is currently unavailable.",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    status: "ok",
    service: "brewscholar-front-end",
    timestamp: new Date().toISOString(),
  });
}
