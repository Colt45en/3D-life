import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  // Server Component - direct database read
  const userPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    limit: 10,
  });

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p className="mb-8 text-muted-foreground">
        Welcome, {session.user.name || session.user.email}!
      </p>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Recent Posts</h2>
        {userPosts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border p-4 hover:bg-accent"
              >
                <h3 className="font-semibold">{post.title}</h3>
                {post.content && (
                  <p className="mt-2 text-muted-foreground">{post.content}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
