"use client";

import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Counter() {
  const count = useAppStore((state) => state.count);
  const increment = useAppStore((state) => state.increment);
  const decrement = useAppStore((state) => state.decrement);
  const reset = useAppStore((state) => state.reset);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zustand Counter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl font-bold">{count}</div>
          <div className="flex gap-2">
            <Button onClick={decrement} variant="outline">
              Decrement
            </Button>
            <Button onClick={increment}>Increment</Button>
            <Button onClick={reset} variant="secondary">
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
