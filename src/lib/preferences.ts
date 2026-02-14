export interface Preferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredModes: string[];
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

const STORAGE_KEY = "jobTrackerPreferences";

const defaultPreferences: Preferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredModes: [],
  experienceLevel: "All",
  skills: [],
  minMatchScore: 40,
};

export function loadPreferences(): Preferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as Preferences;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: Preferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export { defaultPreferences };
