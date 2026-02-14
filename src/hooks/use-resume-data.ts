import { useState, useEffect } from "react";
import type { ResumeData } from "@/data/resume-types";
import { emptyResume } from "@/data/resume-types";

const STORAGE_KEY = "resumeBuilderData";

export function useResumeData() {
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...emptyResume, ...JSON.parse(stored) } : emptyResume;
    } catch {
      return emptyResume;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  }, [resume]);

  const updateField = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setResume((prev) => ({ ...prev, [key]: value }));
  };

  const loadData = (data: ResumeData) => setResume(data);

  const resetData = () => setResume(emptyResume);

  return { resume, updateField, loadData, resetData };
}
