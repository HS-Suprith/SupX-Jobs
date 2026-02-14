import { useState, useEffect } from "react";

const STORAGE_KEY = "placementTestChecklist";

export interface PlacementTestItem {
  id: string;
  label: string;
  hint: string;
}

export const placementTestItems: PlacementTestItem[] = [
  {
    id: "jd_required",
    label: "JD required validation works",
    hint: "Go to Assessments, leave JD empty, click Analyze — should show error toast.",
  },
  {
    id: "short_jd_warning",
    label: "Short JD warning shows for <200 chars",
    hint: "Type fewer than 200 characters into the JD field — a warning should appear below.",
  },
  {
    id: "skills_grouped",
    label: "Skills extraction groups correctly",
    hint: "Paste a JD mentioning React, Java, SQL — verify skills appear under correct categories.",
  },
  {
    id: "round_mapping",
    label: "Round mapping changes based on company + skills",
    hint: "Analyze with company 'Google' then 'MyStartup' — round flow should differ.",
  },
  {
    id: "score_deterministic",
    label: "Score calculation is deterministic",
    hint: "Analyze the same JD twice with the same inputs — readiness score should be identical.",
  },
  {
    id: "skill_toggles",
    label: "Skill toggles update score live",
    hint: "On results, toggle a skill to 'I know' — the score ring should increase immediately.",
  },
  {
    id: "changes_persist",
    label: "Changes persist after refresh",
    hint: "Toggle skills, refresh the page, reopen from Resources — toggles should be preserved.",
  },
  {
    id: "history_saves",
    label: "History saves and loads correctly",
    hint: "Analyze a JD, go to Resources — the entry should appear. Refresh to verify persistence.",
  },
  {
    id: "export_buttons",
    label: "Export buttons copy the correct content",
    hint: "On results, click 'Copy' on the 7-day plan — paste into a text editor and verify content.",
  },
  {
    id: "no_console_errors",
    label: "No console errors on core pages",
    hint: "Open DevTools, navigate through Dashboard, Assessments, Resources, Profile — check for errors.",
  },
];

export function usePlacementTestChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reset = () => setChecked({});

  const isChecked = (id: string) => !!checked[id];
  const passedCount = placementTestItems.filter((t) => checked[t.id]).length;
  const total = placementTestItems.length;
  const allPassed = passedCount === total;

  return { isChecked, toggle, reset, passedCount, total, allPassed };
}
