import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://api.sunrise-sunset.org/json?lat=66.5039&lng=25.7294&formatted=0",
    { next: { revalidate: 3600 } },
  );
  const data = await res.json();
  return NextResponse.json(data);
}
