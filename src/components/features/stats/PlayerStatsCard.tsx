
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface PlayerStatsCardProps {
  player: {
    playerId: string;
    name: string;
    stats: {
      batting: { runs: number; average: number };
      bowling: { wickets: number; average: number };
    };
  };
}

export function PlayerStatsCard({ player }: PlayerStatsCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{player.name}</CardTitle>
        <CardDescription>Player ID: {player.playerId}</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Batting Stats:</h3>
        <p>Runs: {player.stats.batting.runs}</p>
        <p>Average: {player.stats.batting.average}</p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Bowling Stats:</h3>
        <p>Wickets: {player.stats.bowling.wickets}</p>
        <p>Average: {player.stats.bowling.average}</p>
      </CardContent>
    </Card>
  );
}
