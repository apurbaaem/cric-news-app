import { LiveScore } from '@/types';

export function LiveScoreCard({ score }: { score: LiveScore }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-xl transition-all">
      <h3 className="text-xl font-semibold text-center text-indigo-700 mb-4">
        {score.name}
      </h3>
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>{score.teamA}</span>
          <span>{score.scoreA} {score.oversA && `(${score.oversA})`}</span>
        </div>
        <div className="flex justify-between">
          <span>{score.teamB}</span>
          <span>{score.scoreB} {score.oversB && `(${score.oversB})`}</span>
        </div>
      </div>
      <p className="text-sm text-green-600 text-center mt-4 font-medium">
        {score.status || 'Match in progress'}
      </p>
    </div>
  );
}
