import { useState, useEffect } from "react";

const STORAGE_KEY = "rb_test_checklist";

export interface RbTestItem {
  id: string;
  label: string;
  hint: string;
}

export const rbTestItems: RbTestItem[] = [
  {
    id: "form_persist",
    label: "All form sections save to localStorage",
    hint: "Fill out each section, refresh the page, and verify data is preserved.",
  },
  {
    id: "live_preview",
    label: "Live preview updates in real-time",
    hint: "Edit any field and confirm the preview panel reflects changes instantly.",
  },
  {
    id: "template_switch",
    label: "Template switching preserves data",
    hint: "Switch between Classic, Modern, and Minimal — data should remain intact.",
  },
  {
    id: "color_persist",
    label: "Color theme persists after refresh",
    hint: "Select a color, refresh, and verify the same color is still active.",
  },
  {
    id: "ats_score",
    label: "ATS score calculates correctly",
    hint: "Fill all fields and verify the score reaches the expected value based on rules.",
  },
  {
    id: "ats_live",
    label: "Score updates live on edit",
    hint: "Add or remove data and watch the ATS score update without page reload.",
  },
  {
    id: "export_buttons",
    label: "Export buttons work (copy/download)",
    hint: "Click Copy and Download PDF buttons and verify toast confirmations appear.",
  },
  {
    id: "empty_states",
    label: "Empty states handled gracefully",
    hint: "Clear all data and verify no crashes or broken layouts on any page.",
  },
  {
    id: "mobile_responsive",
    label: "Mobile responsive layout works",
    hint: "Resize the browser to mobile width and verify all pages remain usable.",
  },
  {
    id: "no_console_errors",
    label: "No console errors on any page",
    hint: "Open DevTools, navigate through all resume pages, and check for errors.",
  },
];

export function useRbTestChecklist() {
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
  const passedCount = rbTestItems.filter((t) => checked[t.id]).length;
  const allPassed = passedCount === rbTestItems.length;

  return { isChecked, toggle, reset, passedCount, total: rbTestItems.length, allPassed };
}
