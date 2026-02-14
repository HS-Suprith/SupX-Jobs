import { jobs } from "@/data/jobs";
import { loadPreferences } from "@/lib/preferences";
import { computeMatchScore } from "@/lib/match-score";

export interface DigestEntry {
  jobId: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  matchScore: number;
  applyUrl: string;
}

export interface DigestData {
  date: string;
  generatedAt: string;
  entries: DigestEntry[];
}

function getStorageKey(date: string): string {
  return `jobTrackerDigest_${date}`;
}

function getTodayString(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function loadDigest(date?: string): DigestData | null {
  const key = getStorageKey(date ?? getTodayString());
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as DigestData) : null;
  } catch {
    return null;
  }
}

export function generateDigest(): DigestData | null {
  const today = getTodayString();

  // Return existing if already generated today
  const existing = loadDigest(today);
  if (existing) return existing;

  const prefs = loadPreferences();
  if (!prefs) return null;

  const scored = jobs
    .map((job) => ({
      job,
      matchScore: computeMatchScore(job, prefs),
    }))
    .filter((item) => item.matchScore > 0)
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
      return a.job.postedDaysAgo - b.job.postedDaysAgo;
    })
    .slice(0, 10);

  const digest: DigestData = {
    date: today,
    generatedAt: new Date().toISOString(),
    entries: scored.map(({ job, matchScore }) => ({
      jobId: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      experience: job.experience,
      matchScore,
      applyUrl: job.applyUrl,
    })),
  };

  localStorage.setItem(getStorageKey(today), JSON.stringify(digest));
  return digest;
}

export function digestToPlainText(digest: DigestData): string {
  const header = `Top 10 Jobs For You — 9AM Digest\nDate: ${digest.date}\n${"—".repeat(40)}`;
  const body = digest.entries
    .map(
      (e, i) =>
        `${i + 1}. ${e.title} at ${e.company}\n   Location: ${e.location} | Experience: ${e.experience === "Fresher" ? "Fresher" : e.experience + " yrs"}\n   Match Score: ${e.matchScore}%\n   Apply: ${e.applyUrl}`
    )
    .join("\n\n");
  const footer = `\n${"—".repeat(40)}\nThis digest was generated based on your preferences.`;
  return `${header}\n\n${body}${footer}`;
}
