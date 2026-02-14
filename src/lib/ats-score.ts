import type { ResumeData } from "@/data/resume-types";
import { flattenSkills } from "@/data/resume-types";

export interface AtsResult {
  score: number;
  suggestions: string[];
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function hasQuantifiableImpact(text: string): boolean {
  return /\d+%|\d+x|\d+k|\d+\+|\d+ /.test(text);
}

export function computeAtsScore(resume: ResumeData): AtsResult {
  let score = 0;
  const suggestions: string[] = [];

  const summaryWords = wordCount(resume.summary);
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else {
    suggestions.push("Write a stronger summary (40–120 words).");
  }

  if (resume.projects.length >= 2) {
    score += 10;
  } else {
    suggestions.push("Add at least 2 projects.");
  }

  if (resume.experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least 1 work experience entry.");
  }

  const allSkills = flattenSkills(resume.skills);
  if (allSkills.length >= 8) {
    score += 10;
  } else {
    suggestions.push("Add more skills (target 8+).");
  }

  if (resume.links.github || resume.links.linkedin) {
    score += 10;
  } else {
    suggestions.push("Add a GitHub or LinkedIn link.");
  }

  const allBullets = [
    ...resume.experience.map((e) => e.description),
    ...resume.projects.map((p) => p.description),
  ];
  if (allBullets.some(hasQuantifiableImpact)) {
    score += 15;
  } else {
    suggestions.push("Add measurable impact (numbers) in bullets.");
  }

  const hasCompleteEducation = resume.education.some(
    (edu) => edu.institution.trim() && edu.degree.trim() && edu.year.trim()
  );
  if (hasCompleteEducation) {
    score += 10;
  } else {
    suggestions.push("Complete all education fields (institution, degree, year).");
  }

  return {
    score: Math.min(score, 100),
    suggestions: suggestions.slice(0, 3),
  };
}
