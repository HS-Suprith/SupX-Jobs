import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadPreferences } from "@/lib/preferences";
import { loadDigest, generateDigest, digestToPlainText, DigestData } from "@/lib/digest";
import { getScoreTier, ScoreTier } from "@/lib/match-score";
import { getStatusLog, StatusChangeLog } from "@/hooks/use-job-status";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Copy,
  Send,
  Sparkles,
  Settings,
  AlertCircle,
  ExternalLink,
  ClipboardList,
} from "lucide-react";
import { toast } from "sonner";

const tierStyles: Record<ScoreTier, string> = {
  high: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-secondary text-secondary-foreground",
  minimal: "bg-muted text-muted-foreground",
};

const statusLogStyles: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800",
  Rejected: "bg-destructive/10 text-destructive",
  Selected: "bg-success/15 text-success",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const Digest = () => {
  const [digest, setDigest] = useState<DigestData | null>(null);
  const [hasPrefs, setHasPrefs] = useState(false);
  const [checked, setChecked] = useState(false);
  const [statusLog, setStatusLog] = useState<StatusChangeLog[]>([]);

  useEffect(() => {
    const prefs = loadPreferences();
    setHasPrefs(prefs !== null);
    const existing = loadDigest();
    if (existing) setDigest(existing);
    setStatusLog(getStatusLog());
    setChecked(true);
  }, []);

  const handleGenerate = () => {
    const result = generateDigest();
    if (result) {
      setDigest(result);
      toast.success("Digest generated successfully");
    }
  };

  const handleCopy = async () => {
    if (!digest) return;
    const text = digestToPlainText(digest);
    await navigator.clipboard.writeText(text);
    toast.success("Digest copied to clipboard");
  };

  const handleEmailDraft = () => {
    if (!digest) return;
    const text = digestToPlainText(digest);
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(text);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  if (!checked) return null;

  if (!hasPrefs) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-10 py-24">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Settings className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-headline text-foreground">
            Preferences Required
          </h1>
          <p className="mt-3 text-body text-muted-foreground">
            Set your preferences to generate a personalized digest.
          </p>
          <Button asChild className="mt-6">
            <Link to="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Set Preferences
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!digest) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-10 py-24">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Mail className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-headline text-foreground">
            Daily Digest
          </h1>
          <p className="mt-3 text-body text-muted-foreground">
            Generate your personalized 9AM job digest based on your saved
            preferences.
          </p>
          <Button onClick={handleGenerate} className="mt-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Today's 9AM Digest (Simulated)
          </Button>
          <p className="mt-4 text-caption text-muted-foreground italic">
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Digest Card */}
        <Card className="overflow-hidden">
          <div className="bg-primary px-8 py-6">
            <h1 className="font-heading text-title text-primary-foreground">
              Top 10 Jobs For You
            </h1>
            <p className="mt-1 text-caption text-primary-foreground/80">
              9AM Digest — {formatDate(digest.date)}
            </p>
          </div>

          <CardContent className="p-0">
            {digest.entries.length === 0 ? (
              <div className="px-8 py-12 text-center">
                <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <h2 className="font-heading text-body text-foreground">
                  No matching roles today
                </h2>
                <p className="mt-1 text-caption text-muted-foreground">
                  Check again tomorrow or adjust your preferences.
                </p>
              </div>
            ) : (
              <ul className="divide-y">
                {digest.entries.map((entry, i) => (
                  <li key={entry.jobId} className="flex items-start gap-4 px-8 py-5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-caption font-medium text-secondary-foreground">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-heading text-body font-medium text-foreground truncate">
                            {entry.title}
                          </p>
                          <p className="text-caption text-muted-foreground mt-0.5">
                            {entry.company}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tierStyles[getScoreTier(entry.matchScore)]}`}
                        >
                          {entry.matchScore}%
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-muted-foreground">
                        <span>{entry.location}</span>
                        <span>
                          {entry.experience === "Fresher"
                            ? "Fresher"
                            : `${entry.experience} yrs`}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="shrink-0 mt-1">
                      <a href={entry.applyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        Apply
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t px-8 py-5">
              <p className="text-caption text-muted-foreground text-center">
                This digest was generated based on your preferences.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Digest to Clipboard
          </Button>
          <Button variant="outline" onClick={handleEmailDraft}>
            <Send className="h-4 w-4 mr-2" />
            Create Email Draft
          </Button>
          <Button variant="outline" onClick={handleGenerate}>
            <Sparkles className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        </div>

        <p className="mt-4 text-caption text-muted-foreground italic text-center">
          Demo Mode: Daily 9AM trigger simulated manually.
        </p>

        {/* Recent Status Updates */}
        {statusLog.length > 0 && (
          <Card className="mt-10">
            <div className="px-8 py-5 border-b">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-heading text-body font-medium text-foreground">
                  Recent Status Updates
                </h2>
              </div>
            </div>
            <CardContent className="p-0">
              <ul className="divide-y">
                {statusLog.slice(0, 10).map((log, i) => (
                  <li key={`${log.jobId}-${i}`} className="flex items-center justify-between gap-4 px-8 py-4">
                    <div className="min-w-0">
                      <p className="text-caption font-medium text-foreground truncate">
                        {log.jobTitle}
                      </p>
                      <p className="text-caption text-muted-foreground">
                        {log.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${statusLogStyles[log.status] ?? "bg-muted text-muted-foreground"}`}
                      >
                        {log.status}
                      </span>
                      <span className="text-caption text-muted-foreground">
                        {formatDateTime(log.changedAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Digest;
