
import { NextResponse } from 'next/server';

// This is the API route for fetching player statistics.
// It's a placeholder for now and will be connected to a real cricket API later.
export async function GET() {
  const mockPlayerStats = [
    {
      playerId: 'player1',
      name: 'Virat Kohli',
      stats: { batting: { runs: 12876, average: 57.32 }, bowling: { wickets: 4, average: 166.25 } },
    },
    {
      playerId: 'player2',
      name: 'Pat Cummins',
      stats: { batting: { runs: 1345, average: 15.28 }, bowling: { wickets: 216, average: 27.58 } },
    },
  ];

  return NextResponse.json({ stats: mockPlayerStats });
}
