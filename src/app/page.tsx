'use client';

import { useEffect, useState } from 'react';
import { LiveScore } from '@/types';
import { LiveScoreCard } from '@/components/LiveScoreCard';

export default function Home() {
  const [scores, setScores] = useState<LiveScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/live-scores')
      .then(res => res.json())
      .then(data => {
        setScores(data.scores || []);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center text-indigo-800 mb-6">
        🏏 CricLive — Live Cricket Scores
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading matches...</p>
      ) : scores.length === 0 ? (
        <p className="text-center text-gray-500">No matches live right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scores.map(score => (
            <LiveScoreCard key={score.id} score={score} />
          ))}
        </div>
      )}
    </main>
  );
}
