import { useState } from "react";

export type ResumeTemplate = "classic" | "modern" | "minimal";

export type ResumeAccentColor = "teal" | "navy" | "burgundy" | "forest" | "charcoal";

export const ACCENT_COLORS: Record<ResumeAccentColor, string> = {
  teal: "hsl(168, 60%, 40%)",
  navy: "hsl(220, 60%, 35%)",
  burgundy: "hsl(345, 60%, 35%)",
  forest: "hsl(150, 50%, 30%)",
  charcoal: "hsl(0, 0%, 25%)",
};

const TEMPLATE_KEY = "resumeBuilderTemplate";
const COLOR_KEY = "resumeBuilderAccentColor";

const VALID_TEMPLATES: ResumeTemplate[] = ["classic", "modern", "minimal"];
const VALID_COLORS: ResumeAccentColor[] = ["teal", "navy", "burgundy", "forest", "charcoal"];

export function useResumeTemplate() {
  const [template, setTemplateState] = useState<ResumeTemplate>(() => {
    try {
      const stored = localStorage.getItem(TEMPLATE_KEY) as ResumeTemplate;
      if (VALID_TEMPLATES.includes(stored)) return stored;
    } catch {}
    return "classic";
  });

  const [accentColor, setAccentColorState] = useState<ResumeAccentColor>(() => {
    try {
      const stored = localStorage.getItem(COLOR_KEY) as ResumeAccentColor;
      if (VALID_COLORS.includes(stored)) return stored;
    } catch {}
    return "teal";
  });

  const setTemplate = (t: ResumeTemplate) => {
    setTemplateState(t);
    localStorage.setItem(TEMPLATE_KEY, t);
  };

  const setAccentColor = (c: ResumeAccentColor) => {
    setAccentColorState(c);
    localStorage.setItem(COLOR_KEY, c);
  };

  return { template, setTemplate, accentColor, setAccentColor };
}
