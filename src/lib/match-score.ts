import { Job } from "@/data/jobs";
import { Preferences } from "@/lib/preferences";

export function computeMatchScore(job: Job, prefs: Preferences): number {
  let score = 0;

  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();

  // +25 if any roleKeyword appears in title
  if (prefs.roleKeywords.length > 0) {
    const titleMatch = prefs.roleKeywords.some((kw) =>
      titleLower.includes(kw.toLowerCase())
    );
    if (titleMatch) score += 25;
  }

  // +15 if any roleKeyword appears in description
  if (prefs.roleKeywords.length > 0) {
    const descMatch = prefs.roleKeywords.some((kw) =>
      descLower.includes(kw.toLowerCase())
    );
    if (descMatch) score += 15;
  }

  // +15 if location matches
  if (prefs.preferredLocations.length > 0) {
    if (prefs.preferredLocations.includes(job.location)) score += 15;
  }

  // +10 if mode matches
  if (prefs.preferredModes.length > 0) {
    if (prefs.preferredModes.includes(job.mode)) score += 10;
  }

  // +10 if experience matches
  if (prefs.experienceLevel && prefs.experienceLevel !== "All") {
    if (job.experience === prefs.experienceLevel) score += 10;
  }

  // +15 if any skill overlaps
  if (prefs.skills.length > 0) {
    const jobSkillsLower = job.skills.map((s) => s.toLowerCase());
    const overlap = prefs.skills.some((s) =>
      jobSkillsLower.includes(s.toLowerCase())
    );
    if (overlap) score += 15;
  }

  // +5 if posted within 2 days
  if (job.postedDaysAgo <= 2) score += 5;

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") score += 5;

  return Math.min(score, 100);
}

export type ScoreTier = "high" | "medium" | "low" | "minimal";

export function getScoreTier(score: number): ScoreTier {
  if (score >= 80) return "high";
  if (score >= 60) return "medium";
  if (score >= 40) return "low";
  return "minimal";
}
