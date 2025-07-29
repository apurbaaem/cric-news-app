
'use client';

import { useEffect, useState } from 'react';
import { MatchScheduleCard } from '@/components/features/schedule/MatchScheduleCard';

interface Match {
  id: string;
  teamA: string;
  teamB: string;
  date: string;
  venue: string;
}

export default function MatchSchedulePage() {
  const [schedule, setSchedule] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const res = await fetch('/api/cricket/schedule');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setSchedule(data.schedule);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        setError("Failed to load match schedule. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl">Loading match schedule...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl text-red-500">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-100">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">Match Schedule</h1>

      <section className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schedule.length > 0 ? (
            schedule.map((match) => (
              <MatchScheduleCard key={match.id} match={match} />
            ))
          ) : (
            <p className="text-gray-600">No matches scheduled at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
