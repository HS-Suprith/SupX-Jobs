import { useState, useEffect, useRef } from "react";
import type { AnalysisResult } from "@/lib/placement-analyzer";
import { validateEntry } from "@/lib/placement-analyzer";
import { toast } from "sonner";

const STORAGE_KEY = "placementAnalysisHistory";

export function usePlacementHistory() {
  const corruptNotified = useRef(false);

  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored) as unknown[];
      const valid: AnalysisResult[] = [];
      let hadCorrupt = false;
      for (const raw of parsed) {
        const entry = validateEntry(raw);
        if (entry) {
          valid.push(entry);
        } else {
          hadCorrupt = true;
        }
      }
      if (hadCorrupt && !corruptNotified.current) {
        corruptNotified.current = true;
        // Defer toast so it fires after mount
        setTimeout(() => toast.warning("One saved entry couldn't be loaded. Create a new analysis."), 100);
      }
      return valid;
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
    const withTimestamp = { ...updated, updatedAt: new Date().toISOString() };
    setHistory((prev) => prev.map((e) => (e.id === withTimestamp.id ? withTimestamp : e)));
  };

  const remove = (id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  };

  const clearAll = () => setHistory([]);

  return { history, save, update, remove, clearAll };
}
