
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { NewsArticle } from '@/types';

interface NewsArticleCardProps {
  article: NewsArticle;
}

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{article.content}</p>
      </CardContent>
    </Card>
  );
}
