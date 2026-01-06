import { describe, it, expect } from "vitest";
import { useAppStore } from "@/lib/store";

describe("Zustand Store", () => {
  it("should initialize with count 0", () => {
    const { count } = useAppStore.getState();
    expect(count).toBe(0);
  });

  it("should increment count", () => {
    const { increment } = useAppStore.getState();
    increment();
    const { count } = useAppStore.getState();
    expect(count).toBe(1);
  });

  it("should decrement count", () => {
    const { decrement } = useAppStore.getState();
    decrement();
    const { count } = useAppStore.getState();
    expect(count).toBe(0);
  });

  it("should reset count", () => {
    const { increment, reset } = useAppStore.getState();
    increment();
    increment();
    reset();
    const { count } = useAppStore.getState();
    expect(count).toBe(0);
  });
});
