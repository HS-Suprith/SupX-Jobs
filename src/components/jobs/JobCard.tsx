import { Job } from "@/data/jobs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import { ScoreTier, getScoreTier } from "@/lib/match-score";
import React from "react";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  matchScore?: number | null;
  onToggleSave: (id: string) => void;
  onView: (job: Job) => void;
}

const sourceVariant: Record<string, "default" | "secondary" | "outline"> = {
  LinkedIn: "default",
  Naukri: "secondary",
  Indeed: "outline",
};

const tierStyles: Record<ScoreTier, string> = {
  high: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-secondary text-secondary-foreground",
  minimal: "bg-muted text-muted-foreground",
};

function formatPostedAgo(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

const JobCard = React.memo(({ job, isSaved, matchScore, onToggleSave, onView }: JobCardProps) => {
  return (
    <Card className="transition-shadow duration-normal hover:shadow-md">
      <CardContent className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-body font-medium text-foreground truncate">
              {job.title}
            </h3>
            <p className="text-caption text-muted-foreground mt-0.5">
              {job.company}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {matchScore != null && (
              <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tierStyles[getScoreTier(matchScore)]}`}>
                {matchScore}%
              </span>
            )}
            <Badge variant={sourceVariant[job.source] ?? "outline"}>
              {job.source}
            </Badge>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-muted-foreground">
          <span>{job.location} · {job.mode}</span>
          <span>{job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
          <span>{job.salaryRange}</span>
        </div>

        {/* Posted */}
        <p className="mt-3 text-caption text-muted-foreground">
          {formatPostedAgo(job.postedDaysAgo)}
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(job)}>
            <Eye className="h-3.5 w-3.5 mr-1" />
            View
          </Button>
          <Button
            variant={isSaved ? "success" : "outline"}
            size="sm"
            onClick={() => onToggleSave(job.id)}
          >
            {isSaved ? (
              <BookmarkCheck className="h-3.5 w-3.5 mr-1" />
            ) : (
              <Bookmark className="h-3.5 w-3.5 mr-1" />
            )}
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              Apply
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

JobCard.displayName = "JobCard";

export default JobCard;
