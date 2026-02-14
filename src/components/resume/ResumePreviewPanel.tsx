import type { ResumeData } from "@/data/resume-types";

const ResumePreviewPanel = ({ resume }: { resume: ResumeData }) => {
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

  return (
    <div className="border rounded-md bg-white p-8 min-h-[600px] text-[hsl(0,0%,7%)]">
      {/* Header */}
      {resume.personal.name && (
        <div className="text-center border-b border-[hsl(0,0%,85%)] pb-4 mb-5">
          <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            {resume.personal.name}
          </h1>
          <div className="mt-1.5 flex items-center justify-center gap-3 flex-wrap text-[11px] text-[hsl(0,0%,40%)]">
            {resume.personal.email && <span>{resume.personal.email}</span>}
            {resume.personal.phone && <span>·</span>}
            {resume.personal.phone && <span>{resume.personal.phone}</span>}
            {resume.personal.location && <span>·</span>}
            {resume.personal.location && <span>{resume.personal.location}</span>}
          </div>
          {(resume.links.github || resume.links.linkedin) && (
            <div className="mt-1 flex items-center justify-center gap-3 text-[11px] text-[hsl(0,0%,40%)]">
              {resume.links.github && <span>{resume.links.github}</span>}
              {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {resume.summary && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(0,0%,7%)] border-b border-[hsl(0,0%,85%)] pb-1 mb-2">
            Summary
          </h2>
          <p className="text-[11px] leading-relaxed text-[hsl(0,0%,25%)]">{resume.summary}</p>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(0,0%,7%)] border-b border-[hsl(0,0%,85%)] pb-1 mb-2">
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-semibold">{edu.institution}</span>
                <span className="text-[10px] text-[hsl(0,0%,40%)]">{edu.year}</span>
              </div>
              <p className="text-[11px] text-[hsl(0,0%,40%)]">{edu.degree}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(0,0%,7%)] border-b border-[hsl(0,0%,85%)] pb-1 mb-2">
            Experience
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-semibold">{exp.role}</span>
                <span className="text-[10px] text-[hsl(0,0%,40%)]">{exp.duration}</span>
              </div>
              <p className="text-[11px] text-[hsl(0,0%,40%)] italic">{exp.company}</p>
              <p className="text-[11px] text-[hsl(0,0%,25%)] mt-0.5 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(0,0%,7%)] border-b border-[hsl(0,0%,85%)] pb-1 mb-2">
            Projects
          </h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="text-[11px] font-semibold">{proj.title}</span>
                <span className="text-[10px] text-[hsl(0,0%,40%)]">{proj.techStack}</span>
              </div>
              <p className="text-[11px] text-[hsl(0,0%,25%)] mt-0.5 leading-relaxed">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[hsl(0,0%,7%)] border-b border-[hsl(0,0%,85%)] pb-1 mb-2">
            Skills
          </h2>
          <p className="text-[11px] text-[hsl(0,0%,25%)]">{skillList.join(" · ")}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreviewPanel;
