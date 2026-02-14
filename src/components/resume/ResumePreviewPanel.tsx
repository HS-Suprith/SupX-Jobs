import type { ResumeData } from "@/data/resume-types";
import type { ResumeTemplate } from "@/hooks/use-resume-template";
import { cn } from "@/lib/utils";

const ResumePreviewPanel = ({
  resume,
  template = "classic",
}: {
  resume: ResumeData;
  template?: ResumeTemplate;
}) => {
  const hasContent =
    resume.personal.name ||
    resume.summary ||
    resume.education.length > 0 ||
    resume.experience.length > 0 ||
    resume.projects.length > 0 ||
    resume.skills;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] border rounded-md bg-white">
        <p className="text-caption text-muted-foreground text-center px-8">
          Fill out the form to see your resume preview here.
        </p>
      </div>
    );
  }

  const skillList = resume.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  /* ── Template-specific styles ── */
  const styles = {
    classic: {
      container: "p-8",
      name: "text-xl font-bold tracking-tight text-center",
      meta: "mt-1.5 flex items-center justify-center gap-3 flex-wrap text-[11px] text-[hsl(0,0%,40%)]",
      links: "mt-1 flex items-center justify-center gap-3 text-[11px] text-[hsl(0,0%,40%)]",
      headerBorder: "border-b border-[hsl(0,0%,85%)] pb-4 mb-5",
      sectionTitle: "text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(0,0%,7%)] border-b border-[hsl(0,0%,85%)] pb-1 mb-2",
      bodyText: "text-[11px] leading-relaxed text-[hsl(0,0%,25%)]",
      subtitleText: "text-[11px] font-semibold",
      dateText: "text-[10px] text-[hsl(0,0%,40%)]",
      italicText: "text-[11px] text-[hsl(0,0%,40%)] italic",
    },
    modern: {
      container: "p-8",
      name: "text-2xl font-bold tracking-tight",
      meta: "mt-2 flex items-center gap-3 flex-wrap text-[11px] text-[hsl(0,0%,40%)]",
      links: "mt-1 flex items-center gap-3 text-[11px] text-[hsl(0,0%,40%)]",
      headerBorder: "border-b-2 border-[hsl(0,0%,7%)] pb-4 mb-5",
      sectionTitle: "text-[11px] font-bold uppercase tracking-[0.12em] text-[hsl(0,0%,7%)] border-b-2 border-[hsl(0,0%,7%)] pb-1 mb-2",
      bodyText: "text-[11px] leading-relaxed text-[hsl(0,0%,25%)]",
      subtitleText: "text-[11px] font-bold",
      dateText: "text-[10px] text-[hsl(0,0%,40%)]",
      italicText: "text-[11px] text-[hsl(0,0%,40%)]",
    },
    minimal: {
      container: "p-6",
      name: "text-lg font-semibold tracking-tight",
      meta: "mt-1 flex items-center gap-2 flex-wrap text-[10px] text-[hsl(0,0%,50%)]",
      links: "mt-0.5 flex items-center gap-2 text-[10px] text-[hsl(0,0%,50%)]",
      headerBorder: "pb-3 mb-4",
      sectionTitle: "text-[9px] font-semibold uppercase tracking-[0.2em] text-[hsl(0,0%,35%)] mb-2",
      bodyText: "text-[10px] leading-relaxed text-[hsl(0,0%,30%)]",
      subtitleText: "text-[10px] font-semibold",
      dateText: "text-[9px] text-[hsl(0,0%,50%)]",
      italicText: "text-[10px] text-[hsl(0,0%,50%)]",
    },
  };

  const s = styles[template];

  return (
    <div className={cn("border rounded-md bg-white min-h-[600px] text-[hsl(0,0%,7%)]", s.container)}>
      {/* Header */}
      {resume.personal.name && (
        <div className={s.headerBorder}>
          <h1 className={s.name} style={{ fontFamily: "var(--font-heading)" }}>
            {resume.personal.name}
          </h1>
          <div className={s.meta}>
            {resume.personal.email && <span>{resume.personal.email}</span>}
            {resume.personal.phone && <span>·</span>}
            {resume.personal.phone && <span>{resume.personal.phone}</span>}
            {resume.personal.location && <span>·</span>}
            {resume.personal.location && <span>{resume.personal.location}</span>}
          </div>
          {(resume.links.github || resume.links.linkedin) && (
            <div className={s.links}>
              {resume.links.github && <span>{resume.links.github}</span>}
              {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {resume.summary && (
        <section className="mb-4">
          <h2 className={s.sectionTitle}>Summary</h2>
          <p className={s.bodyText}>{resume.summary}</p>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle}>Education</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className={s.subtitleText}>{edu.institution}</span>
                <span className={s.dateText}>{edu.year}</span>
              </div>
              <p className={s.italicText}>{edu.degree}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle}>Experience</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className={s.subtitleText}>{exp.role}</span>
                <span className={s.dateText}>{exp.duration}</span>
              </div>
              <p className={s.italicText}>{exp.company}</p>
              <p className={cn(s.bodyText, "mt-0.5")}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle}>Projects</h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className={s.subtitleText}>{proj.title}</span>
                <span className={s.dateText}>{proj.techStack}</span>
              </div>
              <p className={cn(s.bodyText, "mt-0.5")}>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle}>Skills</h2>
          <p className={s.bodyText}>{skillList.join(" · ")}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreviewPanel;
