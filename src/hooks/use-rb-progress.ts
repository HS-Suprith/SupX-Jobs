import { useState, useEffect } from "react";

const STORAGE_KEY = "rb_build_progress";

export interface RbStepData {
  artifact?: string; // screenshot / URL
  status: "locked" | "active" | "completed";
}

export interface RbProgress {
  steps: Record<number, RbStepData>;
}

const TOTAL_STEPS = 8;

function defaultProgress(): RbProgress {
  const steps: Record<number, RbStepData> = {};
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    steps[i] = { status: i === 1 ? "active" : "locked" };
  }
  return { steps };
}

export function useRbProgress() {
  const [progress, setProgress] = useState<RbProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProgress();
    } catch {
      return defaultProgress();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getStep = (step: number): RbStepData =>
    progress.steps[step] || { status: "locked" };

  const isStepAccessible = (step: number): boolean => {
    const s = getStep(step);
    return s.status === "active" || s.status === "completed";
  };

  const completeStep = (step: number, artifact: string) => {
    setProgress((prev) => {
      const next = { ...prev, steps: { ...prev.steps } };
      next.steps[step] = { status: "completed", artifact };
      // Unlock next step
      if (step < TOTAL_STEPS) {
        const nextStep = next.steps[step + 1];
        if (!nextStep || nextStep.status === "locked") {
          next.steps[step + 1] = { status: "active" };
        }
      }
      return next;
    });
  };

  const saveArtifact = (step: number, artifact: string) => {
    localStorage.setItem(`rb_step_${step}_artifact`, artifact);
    completeStep(step, artifact);
  };

  const getArtifact = (step: number): string | null => {
    return localStorage.getItem(`rb_step_${step}_artifact`);
  };

  const completedCount = Object.values(progress.steps).filter(
    (s) => s.status === "completed"
  ).length;

  const allCompleted = completedCount === TOTAL_STEPS;

  const resetAll = () => {
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      localStorage.removeItem(`rb_step_${i}_artifact`);
    }
    setProgress(defaultProgress());
  };

  return {
    progress,
    getStep,
    isStepAccessible,
    completeStep,
    saveArtifact,
    getArtifact,
    completedCount,
    allCompleted,
    totalSteps: TOTAL_STEPS,
    resetAll,
  };
}
