// types.ts

export interface LiveScore {
  id: string;
  name: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  scoreB: string;
  oversA?: string;
  oversB?: string;
  status: string;
}
