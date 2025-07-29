
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface MatchScheduleCardProps {
  match: {
    id: string;
    teamA: string;
    teamB: string;
    date: string;
    venue: string;
  };
}

export function MatchScheduleCard({ match }: MatchScheduleCardProps) {
  const matchDate = new Date(match.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{match.teamA} vs {match.teamB}</CardTitle>
        <CardDescription>{match.venue}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">Date: {matchDate}</p>
      </CardContent>
    </Card>
  );
}
