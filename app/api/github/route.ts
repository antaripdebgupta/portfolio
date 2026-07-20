import { NextResponse } from "next/server";
import { fetchGithubContributions } from "@/lib/github";

export const revalidate = 3600; // 1-hour ISR cache

export async function GET() {
  const result = await fetchGithubContributions();

  if (result.error) {
    return NextResponse.json(
      {
        prs: [],
        issues: [],
        error: result.error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    prs: result.prs,
    issues: [],
  });
}
