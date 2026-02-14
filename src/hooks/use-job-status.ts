import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export interface StatusChangeLog {
  jobId: string;
  jobTitle: string;
  company: string;
  status: JobStatus;
  changedAt: string;
}

const STATUS_KEY = "jobTrackerStatus";
const LOG_KEY = "jobTrackerStatusLog";

function loadStatuses(): Record<string, JobStatus> {
  try {
    const stored = localStorage.getItem(STATUS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function loadLog(): StatusChangeLog[] {
  try {
    const stored = localStorage.getItem(LOG_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getStatusLog(): StatusChangeLog[] {
  return loadLog();
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<string, JobStatus>>(loadStatuses);

  useEffect(() => {
    localStorage.setItem(STATUS_KEY, JSON.stringify(statuses));
  }, [statuses]);

  const getStatus = useCallback(
    (jobId: string): JobStatus => statuses[jobId] ?? "Not Applied",
    [statuses]
  );

  const setStatus = useCallback(
    (jobId: string, status: JobStatus, jobTitle: string, company: string) => {
      setStatuses((prev) => ({ ...prev, [jobId]: status }));

      if (status !== "Not Applied") {
        const log = loadLog();
        log.unshift({
          jobId,
          jobTitle,
          company,
          status,
          changedAt: new Date().toISOString(),
        });
        // Keep last 50 entries
        localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(0, 50)));
        toast.success(`Status updated: ${status}`);
      }
    },
    []
  );

  return { getStatus, setStatus };
}
