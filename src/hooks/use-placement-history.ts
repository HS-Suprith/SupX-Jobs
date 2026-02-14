import { useState, useEffect } from "react";
import type { AnalysisResult } from "@/lib/placement-analyzer";

const STORAGE_KEY = "placementAnalysisHistory";

export function usePlacementHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const save = (entry: AnalysisResult) => {
    setHistory((prev) => [entry, ...prev]);
  };

  const update = (updated: AnalysisResult) => {
    setHistory((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const remove = (id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  };

  const clearAll = () => setHistory([]);

  return { history, save, update, remove, clearAll };
}
