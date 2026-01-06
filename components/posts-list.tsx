"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  content: string | null;
}

async function fetchPosts(): Promise<Post[]> {
  // This is a placeholder - in production this would call your API
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: "1",
      title: "Getting Started with Next.js 15",
      content: "Next.js 15 introduces amazing new features...",
    },
    {
      id: "2",
      title: "Understanding Server Actions",
      content: "Server Actions provide a seamless way to handle mutations...",
    },
  ];
}

export function PostsList() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 w-3/4 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-4 w-full rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>Failed to load posts</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className="text-xl">{post.title}</CardTitle>
          </CardHeader>
          {post.content && <CardContent>{post.content}</CardContent>}
        </Card>
      ))}
    </div>
  );
}
