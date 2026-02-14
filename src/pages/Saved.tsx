import { useState } from "react";
import { jobs, Job } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/use-saved-jobs";
import { useJobStatus } from "@/hooks/use-job-status";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Bookmark } from "lucide-react";

const Saved = () => {
  const { savedIds, isSaved, toggleSave } = useSavedJobs();
  const { getStatus, setStatus } = useJobStatus();
  const [viewJob, setViewJob] = useState<Job | null>(null);

  const savedJobs = jobs.filter((j) => savedIds.includes(j.id));

  if (savedJobs.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-10 py-24">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Bookmark className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="font-heading text-headline text-foreground">No saved jobs</h1>
          <p className="mt-3 text-body text-muted-foreground">
            Jobs you bookmark from the Dashboard will appear here for quick reference.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-6 md:px-10 py-8 md:py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading text-headline text-foreground">Saved Jobs</h1>
        <p className="mt-1 text-caption text-muted-foreground">
          {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={isSaved(job.id)}
              status={getStatus(job.id)}
              onToggleSave={toggleSave}
              onView={setViewJob}
              onStatusChange={(id, s, t, c) => setStatus(id, s, t, c)}
            />
          ))}
        </div>
      </div>

      <JobDetailModal
        job={viewJob}
        open={!!viewJob}
        onOpenChange={(open) => !open && setViewJob(null)}
      />
    </main>
  );
};

export default Saved;
