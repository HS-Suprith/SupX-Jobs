import { useState, useEffect } from "react";

const STORAGE_KEY = "jobTrackerArtifacts";

export interface Artifacts {
  lovableLink: string;
  githubLink: string;
  deployedUrl: string;
  shipped: boolean;
}

const defaultArtifacts: Artifacts = {
  lovableLink: "",
  githubLink: "",
  deployedUrl: "",
  shipped: false,
};

const URL_REGEX = /^https?:\/\/.+\..+/;

export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url.trim());
}

export function useArtifacts() {
  const [artifacts, setArtifacts] = useState<Artifacts>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultArtifacts, ...JSON.parse(stored) } : defaultArtifacts;
    } catch {
      return defaultArtifacts;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artifacts));
  }, [artifacts]);

  const update = (key: keyof Artifacts, value: string | boolean) => {
    setArtifacts((prev) => ({ ...prev, [key]: value }));
  };

  const allLinksValid =
    isValidUrl(artifacts.lovableLink) &&
    isValidUrl(artifacts.githubLink) &&
    isValidUrl(artifacts.deployedUrl);

  const markShipped = () => update("shipped", true);
  const unship = () => update("shipped", false);

  return { artifacts, update, allLinksValid, markShipped, unship };
}
