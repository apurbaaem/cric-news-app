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
      team1: match.teamInfo?.[0]?.name,
      team2: match.teamInfo?.[1]?.name,
      score1: match.score?.[0]?.r || '',
      score2: match.score?.[1]?.r || '',
    })) || [];

    return NextResponse.json({ scores: matches }, { status: 200 });

  } catch (error) {
    console.error('Error fetching live scores:', error);
    return NextResponse.json({ error: 'Failed to fetch live scores' }, { status: 500 });
  }
}
