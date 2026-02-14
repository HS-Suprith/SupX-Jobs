import { Job } from "@/data/jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

interface JobDetailModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const JobDetailModal = ({ job, open, onOpenChange }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-title">{job.title}</DialogTitle>
          <DialogDescription className="text-caption">
            {job.company} · {job.location} · {job.mode}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          <div className="flex flex-wrap gap-4 text-caption text-muted-foreground">
            <span>Experience: {job.experience === "Fresher" ? "Fresher" : `${job.experience} yrs`}</span>
            <span>Salary: {job.salaryRange}</span>
            <span>Source: {job.source}</span>
          </div>

          <div>
            <p className="text-caption font-medium text-foreground mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-caption font-medium text-foreground mb-2">Description</p>
            <p className="text-caption text-muted-foreground whitespace-pre-line leading-relaxed">
              {job.description}
            </p>
          </div>

          <Button asChild className="w-full">
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
