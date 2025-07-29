'use client';

import { useEffect, useState } from 'react';
import { LiveScore, NewsArticle } from '@/types';
import { LiveScoreCard } from '@/components/features/home/LiveScoreCard';
import { NewsArticleCard } from '@/components/features/home/NewsArticleCard';

export default function Home() {
  const [liveScores, setLiveScores] = useState<LiveScore[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [scoresRes, articlesRes] = await Promise.all([
          fetch('/api/cricket/live-scores'),
          fetch('/api/articles'),
        ]);

        if (!scoresRes.ok) {
          throw new Error(`HTTP error! status: ${scoresRes.status} for live scores`);
        }
        if (!articlesRes.ok) {
          throw new Error(`HTTP error! status: ${articlesRes.status} for news articles`);
        }

        const scoresData = await scoresRes.json();
        const articlesData = await articlesRes.json();

        setLiveScores(scoresData.scores);
        setNewsArticles(articlesData.articles);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl">Loading latest news and scores...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p className="text-xl text-red-500">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-100">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">CricNews</h1>

      <section className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Live Scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {liveScores.length > 0 ? (
            liveScores.map((score) => (
              <LiveScoreCard key={score.id} score={score} />
            ))
          ) : (
            <p className="text-gray-600">No live scores available at the moment.</p>
          )}
        </div>
      </section>

      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.length > 0 ? (
            newsArticles.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="text-gray-600">No news articles available at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
}