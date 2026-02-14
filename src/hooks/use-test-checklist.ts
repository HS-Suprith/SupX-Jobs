import { useState, useEffect } from "react";

const STORAGE_KEY = "jobTrackerTestChecklist";

export interface TestItem {
  id: string;
  label: string;
  hint: string;
}

export const testItems: TestItem[] = [
  {
    id: "prefs_persist",
    label: "Preferences persist after refresh",
    hint: "Go to Settings, save preferences, refresh the page, and confirm they are prefilled.",
  },
  {
    id: "match_score",
    label: "Match score calculates correctly",
    hint: "Set preferences with specific keywords/skills, then check that Dashboard job cards show expected score badges.",
  },
  {
    id: "match_toggle",
    label: '"Show only matches" toggle works',
    hint: "Enable the toggle on Dashboard and verify only jobs above your threshold remain visible.",
  },
  {
    id: "save_persist",
    label: "Save job persists after refresh",
    hint: "Save a job on Dashboard, refresh the page, then check the Saved page.",
  },
  {
    id: "apply_tab",
    label: "Apply opens in new tab",
    hint: "Click Apply on any job card and verify it opens the URL in a new browser tab.",
  },
  {
    id: "status_persist",
    label: "Status update persists after refresh",
    hint: "Change a job's status to Applied, refresh the page, and confirm the status remains.",
  },
  {
    id: "status_filter",
    label: "Status filter works correctly",
    hint: "Set a job to Applied, then use the Status dropdown filter on Dashboard to show only Applied jobs.",
  },
  {
    id: "digest_top10",
    label: "Digest generates top 10 by score",
    hint: "Generate a digest on the Digest page and verify it shows the 10 highest-scored jobs.",
  },
  {
    id: "digest_persist",
    label: "Digest persists for the day",
    hint: "Generate a digest, refresh the page, and confirm the same digest loads without regenerating.",
  },
  {
    id: "no_console_errors",
    label: "No console errors on main pages",
    hint: "Open browser DevTools, navigate through Dashboard, Saved, Digest, Settings, and check for errors.",
  },
];

export function useTestChecklist() {
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

  const reset = () => {
    setChecked({});
  };

  const isChecked = (id: string) => !!checked[id];
  const passedCount = testItems.filter((t) => checked[t.id]).length;
  const allPassed = passedCount === testItems.length;

  return { isChecked, toggle, reset, passedCount, total: testItems.length, allPassed };
}
