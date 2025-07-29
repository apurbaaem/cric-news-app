
'use client';

import { useEffect, useState } from 'react';
import { NewsArticle } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function AdminPanel() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setArticles(data.articles);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      setError("Failed to load articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      let res;
      if (editingArticleId) {
        res = await fetch(`/api/articles/${editingArticleId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
      } else {
        res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content }),
        });
      }

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setTitle('');
      setContent('');
      setEditingArticleId(null);
      fetchArticles(); // Refresh the list of articles
    } catch (err) {
      console.error("Failed to save article:", err);
      setError("Failed to save article.");
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setTitle(article.title);
    setContent(article.content);
    setEditingArticleId(article.id);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      fetchArticles(); // Refresh the list of articles
    } catch (err) {
      console.error("Failed to delete article:", err);
      setError("Failed to delete article.");
    }
  };

  if (loading) {
    return <p className="text-xl">Loading admin panel...</p>;
  }

  if (error) {
    return <p className="text-xl text-red-500">Error: {error}</p>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel - Manage Articles</h2>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingArticleId ? 'Edit Article' : 'Add New Article'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="content"
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <Button type="submit">
              {editingArticleId ? 'Update Article' : 'Add Article'}
            </Button>
            {editingArticleId && (
              <Button type="button" variant="outline" onClick={() => {
                setEditingArticleId(null);
                setTitle('');
                setContent('');
              }} className="ml-2">
                Cancel Edit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-bold mb-4">Existing Articles</h3>
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p className="text-sm text-gray-600 line-clamp-2">{article.content}</p>
                <div className="flex space-x-2 ml-4">
                  <Button variant="secondary" onClick={() => handleEdit(article)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(article.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600">No articles found.</p>
        )}
      </div>
    </div>
  );
}
