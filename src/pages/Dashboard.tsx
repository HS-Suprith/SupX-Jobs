import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobStatus } from "@/hooks/use-job-status";
import { loadPreferences } from "@/lib/preferences";
import { computeMatchScore } from "@/lib/match-score";
import FilterBar, { Filters } from "@/components/jobs/FilterBar";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings, AlertCircle } from "lucide-react";

const defaultFilters: Filters = {
  keyword: "",
  location: "All",
  mode: "All",
  experience: "All",
  source: "All",
  sort: "Latest",
  status: "All",
};

function extractSalaryNum(s: string): number {
  const match = s.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const { isSaved, toggleSave } = useSavedJobs();
  const { getStatus, setStatus } = useJobStatus();

  const prefs = useMemo(() => loadPreferences(), []);
  const hasPrefs = prefs !== null;

  const scoredJobs = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: prefs ? computeMatchScore(job, prefs) : null,
    }));
  }, [prefs]);

  const filtered = useMemo(() => {
    let result = [...scoredJobs];

    if (showOnlyMatches && prefs) {
      result = result.filter(
        (item) => item.matchScore !== null && item.matchScore >= prefs.minMatchScore
      );
    }

    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (item) =>
          item.job.title.toLowerCase().includes(kw) ||
          item.job.company.toLowerCase().includes(kw)
      );
    }

    if (filters.location !== "All")
      result = result.filter((item) => item.job.location === filters.location);
    if (filters.mode !== "All")
      result = result.filter((item) => item.job.mode === filters.mode);
    if (filters.experience !== "All")
      result = result.filter((item) => item.job.experience === filters.experience);
    if (filters.source !== "All")
      result = result.filter((item) => item.job.source === filters.source);
    if (filters.status !== "All")
      result = result.filter((item) => getStatus(item.job.id) === filters.status);

    switch (filters.sort) {
      case "Latest":
        result.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
        break;
      case "Oldest":
        result.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
        break;
      case "Match Score":
        result.sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
        break;
      case "Salary":
        result.sort(
          (a, b) => extractSalaryNum(b.job.salaryRange) - extractSalaryNum(a.job.salaryRange)
        );
        break;
    }

    return result;
  }, [filters, scoredJobs, showOnlyMatches, prefs, getStatus]);

  const handleView = useCallback((job: Job) => setViewJob(job), []);
  const handleStatusChange = useCallback(
    (jobId: string, status: any, title: string, company: string) => {
      setStatus(jobId, status, title, company);
    },
    [setStatus]
  );

  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-headline text-foreground">Dashboard</h1>
        <p className="mt-1 text-caption text-muted-foreground">
          {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
        </p>

        {!hasPrefs && (
          <div className="mt-4 flex items-center gap-3 rounded-md border border-warning/40 bg-warning/5 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-warning shrink-0" />
            <p className="text-caption text-foreground flex-1">
              Set your preferences to activate intelligent matching.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/settings">
                <Settings className="h-3.5 w-3.5 mr-1" />
                Set Preferences
              </Link>
            </Button>
          </div>
        )}

        <div className="mt-6">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        {hasPrefs && (
          <div className="mt-4 flex items-center gap-3">
            <Switch
              checked={showOnlyMatches}
              onCheckedChange={setShowOnlyMatches}
              id="match-toggle"
            />
            <Label htmlFor="match-toggle" className="text-caption text-muted-foreground cursor-pointer">
              Show only jobs above my threshold ({prefs!.minMatchScore}%)
            </Label>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map(({ job, matchScore }) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              matchScore={matchScore}
              status={getStatus(job.id)}
              onToggleSave={toggleSave}
              onView={handleView}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <h2 className="font-heading text-title text-foreground">No roles match your criteria</h2>
            <p className="mt-2 text-body text-muted-foreground">
              Adjust filters or lower your match threshold in Settings.
            </p>
          </div>
        )}
      </div>

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
      />
    </main>
  );
};

export default Dashboard;
