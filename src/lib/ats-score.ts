import type { ResumeData } from "@/data/resume-types";
import { flattenSkills } from "@/data/resume-types";

export interface AtsResult {
  score: number;
  suggestions: string[];
}

const ACTION_VERBS = /\b(built|led|designed|improved|developed|created|implemented|optimized|automated|managed|launched|delivered|integrated|deployed|architected|refactored|migrated|analyzed|reduced|increased|established|streamlined|collaborated|engineered)\b/i;

export function computeAtsScore(resume: ResumeData): AtsResult {
  let score = 0;
  const suggestions: string[] = [];

  // +10 name
  if (resume.personal.name.trim()) {
    score += 10;
  } else {
    suggestions.push("Add your full name (+10 points)");
  }

  // +10 email
  if (resume.personal.email.trim()) {
    score += 10;
  } else {
    suggestions.push("Add your email address (+10 points)");
  }

  // +5 phone
  if (resume.personal.phone.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your phone number (+5 points)");
  }

  // +10 summary > 50 chars
  if (resume.summary.trim().length > 50) {
    score += 10;
  } else {
    suggestions.push("Add a professional summary with 50+ characters (+10 points)");
  }

  // +10 summary contains action verbs
  if (ACTION_VERBS.test(resume.summary)) {
    score += 10;
  } else {
    suggestions.push("Use action verbs in your summary (built, led, designed...) (+10 points)");
  }

  // +15 at least 1 experience with bullets
  const hasExpWithBullets = resume.experience.some(
    (e) => e.description.trim().length > 0
  );
  if (resume.experience.length >= 1 && hasExpWithBullets) {
    score += 15;
  } else {
    suggestions.push("Add at least 1 experience entry with description (+15 points)");
  }

  // +10 at least 1 education
  if (resume.education.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least 1 education entry (+10 points)");
  }

  // +10 at least 5 skills
  const allSkills = flattenSkills(resume.skills);
  if (allSkills.length >= 5) {
    score += 10;
  } else {
    suggestions.push("Add at least 5 skills (+10 points)");
  }

  // +10 at least 1 project
  if (resume.projects.length >= 1) {
    score += 10;
  } else {
    suggestions.push("Add at least 1 project (+10 points)");
  }

  // +5 LinkedIn
  if (resume.links.linkedin.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your LinkedIn profile (+5 points)");
  }

  // +5 GitHub
  if (resume.links.github.trim()) {
    score += 5;
  } else {
    suggestions.push("Add your GitHub profile (+5 points)");
  }

  return {
    score: Math.min(score, 100),
    suggestions,
  };
}
