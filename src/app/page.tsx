'use client';

import { useEffect, useState } from 'react';
import { LiveScore } from '@/types';
import { LiveScoreCard } from '../components/LiveScoreCard';

export default function HomePage() {
  const [scores, setScores] = useState<LiveScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch('/api/live-scores');
        const data = await res.json();
        setScores(data.scores || []);
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        🏏 CricLive — Live Cricket Scores
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : scores.length === 0 ? (
        <p className="text-center text-gray-500">No matches live right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {scores.map((score) => (
            <LiveScoreCard key={score.id} score={score} />
          ))}
        </div>
      )}
    </main>
  );
}
