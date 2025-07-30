import { LiveScore } from '@/types';

export function LiveScoreCard({ score }: { score: LiveScore }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition hover:shadow-2xl">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{score.name}</h3>
      <div className="space-y-1 text-gray-800">
        <div className="flex justify-between">
          <span>{score.teamA}</span>
          <span>{score.scoreA} ({score.oversA})</span>
        </div>
        <div className="flex justify-between">
          <span>{score.teamB}</span>
          <span>{score.scoreB} ({score.oversB})</span>
        </div>
      </div>
      <div className="text-sm text-green-600 font-medium mt-3">{score.status}</div>
    </div>
  );
}
