import { useMemo } from "react";
import type { ResumeData } from "@/data/resume-types";
import { computeAtsScore } from "@/lib/ats-score";
import { AlertCircle } from "lucide-react";

const AtsScorePanel = ({ resume }: { resume: ResumeData }) => {
  const { score, suggestions } = useMemo(() => computeAtsScore(resume), [resume]);

  const size = 120;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 70
      ? "hsl(var(--success))"
      : score >= 40
        ? "hsl(var(--warning))"
        : "hsl(var(--destructive))";

  return (
    <div className="space-y-5">
      {/* Score ring */}
      <div className="flex flex-col items-center">
        <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
          ATS Readiness Score
        </p>
        <div className="relative">
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-headline text-foreground">{score}</span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider">
            Suggestions
          </p>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-caption text-muted-foreground">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-warning" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AtsScorePanel;
