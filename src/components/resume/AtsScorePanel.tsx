import { useMemo } from "react";
import type { ResumeData } from "@/data/resume-types";
import { computeAtsScore } from "@/lib/ats-score";
import { AlertCircle, Plus } from "lucide-react";

const AtsScorePanel = ({ resume }: { resume: ResumeData }) => {
  const { score, suggestions } = useMemo(() => computeAtsScore(resume), [resume]);

  const size = 130;
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 71
      ? "hsl(var(--success))"
      : score >= 41
        ? "hsl(var(--warning))"
        : "hsl(var(--destructive))";

  const label =
    score >= 71
      ? "Strong Resume"
      : score >= 41
        ? "Getting There"
        : "Needs Work";

  return (
    <div className="space-y-6">
      {/* Score ring */}
      <div className="flex flex-col items-center">
        <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
          ATS Resume Score
        </p>
        <div className="relative">
          <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={stroke} />
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-500 ease-in-out" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-headline text-foreground">{score}</span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </div>
        </div>
        <span
          className="mt-3 text-caption font-medium px-3 py-1 rounded-full"
          style={{
            color,
            backgroundColor: color.replace(")", " / 0.1)").replace("hsl(", "hsl("),
          }}
        >
          {label}
        </span>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider">
            Improve Your Score
          </p>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-caption text-muted-foreground">
                <Plus className="h-3.5 w-3.5 mt-0.5 shrink-0 text-primary" />
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
