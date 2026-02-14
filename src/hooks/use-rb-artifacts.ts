import { useState, useEffect } from "react";

const STORAGE_KEY = "rb_final_submission";

export interface RbArtifacts {
  lovableLink: string;
  githubLink: string;
  deployedUrl: string;
  shipped: boolean;
}

const defaults: RbArtifacts = {
  lovableLink: "",
  githubLink: "",
  deployedUrl: "",
  shipped: false,
};

const URL_REGEX = /^https?:\/\/.+\..+/;

export function isValidRbUrl(url: string): boolean {
  return URL_REGEX.test(url.trim());
}

export function useRbArtifacts() {
  const [artifacts, setArtifacts] = useState<RbArtifacts>(() => {
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

  const update = (key: keyof RbArtifacts, value: string | boolean) => {
    setArtifacts((prev) => ({ ...prev, [key]: value }));
  };

  const allLinksValid =
    isValidRbUrl(artifacts.lovableLink) &&
    isValidRbUrl(artifacts.githubLink) &&
    isValidRbUrl(artifacts.deployedUrl);

  const markShipped = () => update("shipped", true);
  const unship = () => update("shipped", false);

  return { artifacts, update, allLinksValid, markShipped, unship };
}
