import { useState } from "react";

export type ResumeTemplate = "classic" | "modern" | "minimal";

const STORAGE_KEY = "resumeBuilderTemplate";

export function useResumeTemplate() {
  const [template, setTemplateState] = useState<ResumeTemplate>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "classic" || stored === "modern" || stored === "minimal") return stored;
    } catch {}
    return "classic";
  });

  const setTemplate = (t: ResumeTemplate) => {
    setTemplateState(t);
    localStorage.setItem(STORAGE_KEY, t);
  };

  return { template, setTemplate };
}
