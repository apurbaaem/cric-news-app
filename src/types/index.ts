export interface LiveScore {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: string;
  oversA: string;
  scoreB?: string;
  oversB?: string;
  status: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}
