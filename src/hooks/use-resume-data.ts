import { useState, useEffect } from "react";
import type { ResumeData } from "@/data/resume-types";
import { emptyResume, migrateSkills, migrateProject } from "@/data/resume-types";

const STORAGE_KEY = "resumeBuilderData";

function migrateResume(raw: any): ResumeData {
  return {
    ...emptyResume,
    ...raw,
    skills: migrateSkills(raw.skills),
    projects: Array.isArray(raw.projects) ? raw.projects.map(migrateProject) : [],
  };
}

export function useResumeData() {
  const [resume, setResume] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? migrateResume(JSON.parse(stored)) : emptyResume;
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
