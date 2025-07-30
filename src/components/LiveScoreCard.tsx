import { LiveScore } from '@/types';


export function LiveScoreCard({ score }: { score: LiveScore }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 space-y-3">
      {/* Match Title */}
      <h2 className="text-lg font-bold text-indigo-800 text-center">{score.name}</h2>

      {/* Team A */}
      <div className="flex justify-between text-gray-700">
        <span className="font-medium">{score.teamA}</span>
        <span>{score.scoreA} {score.oversA && `(${score.oversA})`}</span>
      </div>

      {/* Team B */}
      <div className="flex justify-between text-gray-700">
        <span className="font-medium">{score.teamB}</span>
        <span>{score.scoreB} {score.oversB && `(${score.oversB})`}</span>
      </div>

      {/* Status */}
      <p className="text-center text-green-600 font-medium">{score.status}</p>
    </div>
  );
}
