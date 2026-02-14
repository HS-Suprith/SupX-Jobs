import { useState, useMemo } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import FilterBar, { Filters } from "@/components/jobs/FilterBar";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";

const defaultFilters: Filters = {
  keyword: "",
  location: "All",
  mode: "All",
  experience: "All",
  source: "All",
  sort: "Latest",
};

const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const { isSaved, toggleSave } = useSavedJobs();

  const filtered = useMemo(() => {
    let result = [...jobs];

    // keyword
    if (filters.keyword) {
      const kw = filters.keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(kw) ||
          j.company.toLowerCase().includes(kw)
      );
    }

    if (filters.location !== "All")
      result = result.filter((j) => j.location === filters.location);
    if (filters.mode !== "All")
      result = result.filter((j) => j.mode === filters.mode);
    if (filters.experience !== "All")
      result = result.filter((j) => j.experience === filters.experience);
    if (filters.source !== "All")
      result = result.filter((j) => j.source === filters.source);

    // sort
    result.sort((a, b) =>
      filters.sort === "Latest"
        ? a.postedDaysAgo - b.postedDaysAgo
        : b.postedDaysAgo - a.postedDaysAgo
    );

    return result;
  }, [filters]);

  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-headline text-foreground">Dashboard</h1>
        <p className="mt-1 text-caption text-muted-foreground">
          {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
        </p>

        <div className="mt-6">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              onToggleSave={toggleSave}
              onView={setViewJob}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <h2 className="font-heading text-title text-foreground">No matching jobs</h2>
            <p className="mt-2 text-body text-muted-foreground">
              Try adjusting your filters to see more results.
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
