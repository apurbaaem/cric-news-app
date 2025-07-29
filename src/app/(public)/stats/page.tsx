
'use client';

import { useEffect, useState } from 'react';
import { PlayerStatsCard } from '@/components/features/stats/PlayerStatsCard';

interface Player {
  playerId: string;
  name: string;
  stats: {
    batting: { runs: number; average: number };
    bowling: { wickets: number; average: number };
  };
}

export default function PlayerStatsPage() {
  const [playerStats, setPlayerStats] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayerStats() {
      try {
        const res = await fetch('/api/cricket/stats');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPlayerStats(data.stats);
      } catch (err) {
        console.error("Failed to fetch player stats:", err);
        setError("Failed to load player statistics. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerStats();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl">Loading player statistics...</p>
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
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">Player Statistics</h1>

      <section className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playerStats.length > 0 ? (
            playerStats.map((player) => (
              <PlayerStatsCard key={player.playerId} player={player} />
            ))
          ) : (
            <p className="text-gray-600">No player statistics available at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}
