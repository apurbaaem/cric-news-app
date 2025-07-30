// /app/api/live-scores/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = '636cc663-b0a1-4196-bcf5-8f675df5dbd0';
  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);
    const data = await res.json();

    const matches = data.data?.map((match: any) => ({
      id: match.id,
      name: match.name,
      status: match.status,
      teamA: match.teamInfo?.[0]?.name || 'Team A',
      teamB: match.teamInfo?.[1]?.name || 'Team B',
      scoreA: match.score?.[0]?.r?.toString() || '',
      scoreB: match.score?.[1]?.r?.toString() || '',
      oversA: match.score?.[0]?.o?.toString() || '',
      oversB: match.score?.[1]?.o?.toString() || '',
    })) || [];

    return NextResponse.json({ scores: matches }, { status: 200 });

  } catch (error) {
    console.error('Live score error:', error);
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}
