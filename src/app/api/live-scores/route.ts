import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = '636cc663-b0a1-4196-bcf5-8f675df5dbd0';
  const url = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const matches = data.data?.map((match: any) => ({
      id: match.id,
      name: match.name,
      status: match.status,
      teamA: match.teamInfo?.[0]?.name || '',
      teamB: match.teamInfo?.[1]?.name || '',
      scoreA: match.score?.[0]?.r || '',
      scoreB: match.score?.[1]?.r || '',
      oversA: match.score?.[0]?.o || '',
      oversB: match.score?.[1]?.o || '',
    })) || [];

    return NextResponse.json({ scores: matches }, { status: 200 });

  } catch (err) {
    console.error('Error fetching matches:', err);
    return NextResponse.json({ scores: [] }, { status: 500 });
  }
}
