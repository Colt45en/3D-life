import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/counter";
import { PostsList } from "@/components/posts-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Feature Demo</h1>
        <Button asChild variant="outline">
          <Link href="/">← Home</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tech Stack Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 font-semibold">🎯 Next.js 15 App Router</h3>
            <p className="text-sm text-muted-foreground">
              Using React Server Components for optimal performance
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">⚛️ React 19</h3>
            <p className="text-sm text-muted-foreground">
              Latest React with improved performance and features
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">🎨 Tailwind CSS + shadcn/ui</h3>
            <p className="text-sm text-muted-foreground">
              Beautiful, accessible components with utility-first styling
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">🔄 State Management</h3>
            <p className="text-sm text-muted-foreground">
              TanStack Query for server state, Zustand for client state
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Client State (Zustand)</h2>
          <Counter />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Server State (TanStack Query)
          </h2>
          <PostsList />
        </div>
      </div>

      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle>🚀 Ready for Production</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> TypeScript strict mode
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> ESLint + Prettier
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Husky pre-commit hooks
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Vitest testing setup
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Drizzle ORM + PostgreSQL
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> NextAuth authentication
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Vercel deployment ready
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
