
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LiveScore } from '@/types';

interface LiveScoreCardProps {
  score: LiveScore;
}

export function LiveScoreCard({ score }: LiveScoreCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{score.teamA} vs {score.teamB}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold">
          <p>{score.teamA}: {score.scoreA} ({score.oversA})</p>
          {score.scoreB && score.oversB && (
            <p>{score.teamB}: {score.scoreB} ({score.oversB})</p>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{score.status}</p>
      </CardContent>
    </Card>
  );
}
