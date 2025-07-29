
import { NextResponse } from 'next/server';

// This is the API route for fetching live cricket scores from an external API.
export async function GET() {
  const CRICKET_API_KEY = process.env.CRICKET_API_KEY;
  const CRICKET_API_BASE_URL = 'https://api.cricketdata.org/v1'; // Example base URL, replace with your chosen API

  if (!CRICKET_API_KEY) {
    return new NextResponse('Cricket API key not configured.', { status: 500 });
  }

  try {
    // This is a placeholder URL. You will need to consult your chosen API's documentation
    // for the correct endpoint for live scores.
    const response = await fetch(`${CRICKET_API_BASE_URL}/live-scores?apikey=${CRICKET_API_KEY}`);

    if (!response.ok) {
      console.error(`External API error: ${response.status} ${response.statusText}`);
      return new NextResponse('Failed to fetch live scores from external API.', { status: response.status });
    }

    const data = await response.json();

    // You will need to transform the data from the external API to match your LiveScore interface
    // For now, we'll return the raw data from the external API.
    // Example transformation (adjust based on actual API response):
    // const transformedScores = data.matches.map((match: any) => ({
    //   id: match.id,
    //   teamA: match.team1.name,
    //   teamB: match.team2.name,
    //   scoreA: match.team1.score,
    //   oversA: match.team1.overs,
    //   scoreB: match.team2.score,
    //   oversB: match.team2.overs,
    //   status: match.status,
    // }));

    return NextResponse.json({ scores: data.data }); // Assuming 'data' field contains the scores
  } catch (error) {
    console.error('Error fetching live scores:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
