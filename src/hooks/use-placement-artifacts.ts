import { useState, useEffect } from "react";

const STORAGE_KEY = "prp_final_submission";

export interface PlacementArtifacts {
  lovableLink: string;
  githubLink: string;
  deployedUrl: string;
  shipped: boolean;
}

const defaults: PlacementArtifacts = {
  lovableLink: "",
  githubLink: "",
  deployedUrl: "",
  shipped: false,
};

const URL_REGEX = /^https?:\/\/.+\..+/;

export function isValidPlacementUrl(url: string): boolean {
  return URL_REGEX.test(url.trim());
}

export function usePlacementArtifacts() {
  const [artifacts, setArtifacts] = useState<PlacementArtifacts>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artifacts));
  }, [artifacts]);

  const update = (key: keyof PlacementArtifacts, value: string | boolean) => {
    setArtifacts((prev) => ({ ...prev, [key]: value }));
  };

  const allLinksValid =
    isValidPlacementUrl(artifacts.lovableLink) &&
    isValidPlacementUrl(artifacts.githubLink) &&
    isValidPlacementUrl(artifacts.deployedUrl);

  const markShipped = () => update("shipped", true);
  const unship = () => update("shipped", false);

  return { artifacts, update, allLinksValid, markShipped, unship };
}
