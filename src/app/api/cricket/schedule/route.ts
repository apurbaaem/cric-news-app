
import { NextResponse } from 'next/server';

// This is the API route for fetching the match schedule.
// It's a placeholder for now and will be connected to a real cricket API later.
export async function GET() {
  const mockSchedule = [
    {
      id: 'match3',
      teamA: 'Pakistan',
      teamB: 'New Zealand',
      date: '2025-08-15T14:00:00Z',
      venue: 'Gaddafi Stadium, Lahore',
    },
    {
      id: 'match4',
      teamA: 'West Indies',
      teamB: 'Bangladesh',
      date: '2025-08-16T18:30:00Z',
      venue: 'Kensington Oval, Barbados',
    },
  ];

  return NextResponse.json({ schedule: mockSchedule });
}
