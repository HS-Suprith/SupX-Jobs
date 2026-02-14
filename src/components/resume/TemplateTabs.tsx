import type { ResumeTemplate } from "@/hooks/use-resume-template";
import { cn } from "@/lib/utils";

const templates: { value: ResumeTemplate; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
];

const TemplateTabs = ({
  active,
  onChange,
}: {
  active: ResumeTemplate;
  onChange: (t: ResumeTemplate) => void;
}) => (
  <div className="flex items-center gap-1 rounded-md border bg-muted/50 p-1">
    {templates.map((t) => (
      <button
        key={t.value}
        onClick={() => onChange(t.value)}
        className={cn(
          "px-3 py-1.5 rounded text-caption font-medium transition-colors duration-150",
          active === t.value
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {t.label}
      </button>
    ))}
  </div>
);

export default TemplateTabs;
