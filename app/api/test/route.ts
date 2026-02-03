import { NextResponse } from "next/server";

export async function GET() {
  console.log("Test API route called");
  return NextResponse.json({ message: "Test API works!" });
}

export async function POST() {
  console.log("Test POST API route called");
  return NextResponse.json({ message: "Test POST works!" });
}
