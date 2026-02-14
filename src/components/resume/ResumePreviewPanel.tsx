import type { ResumeData } from "@/data/resume-types";
import type { ResumeTemplate, ResumeAccentColor } from "@/hooks/use-resume-template";
import { ACCENT_COLORS } from "@/hooks/use-resume-template";
import { flattenSkills } from "@/data/resume-types";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Mail, Phone, MapPin } from "lucide-react";

/* ── Shared section renderers ── */
const SectionContent = ({
  resume,
  s,
  accent,
}: {
  resume: ResumeData;
  s: Record<string, string>;
  accent: string;
}) => {
  const allSkills = flattenSkills(resume.skills);
  const skills = typeof resume.skills === "string"
    ? { technical: allSkills, soft: [] as string[], tools: [] as string[] }
    : resume.skills;

  const SkillGroup = ({ label, items }: { label: string; items: string[] }) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-1.5">
        <span className={cn(s.subtitleText)}>{label}: </span>
        <span className="inline-flex flex-wrap gap-1 ml-1">
          {items.map((skill) => (
            <span
              key={skill}
              className="inline-block rounded px-1.5 py-0.5 text-[9px] font-medium"
              style={{ backgroundColor: accent + "15", color: accent }}
            >
              {skill}
            </span>
          ))}
        </span>
      </div>
    );
  };

  return (
    <>
      {resume.summary && (
        <section className="mb-4">
          <h2 className={s.sectionTitle} style={{ color: accent, borderColor: accent + "40" }}>Summary</h2>
          <p className={s.bodyText}>{resume.summary}</p>
        </section>
      )}

      {resume.education.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle} style={{ color: accent, borderColor: accent + "40" }}>Education</h2>
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

      {resume.experience.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle} style={{ color: accent, borderColor: accent + "40" }}>Experience</h2>
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

      {resume.projects.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle} style={{ color: accent, borderColor: accent + "40" }}>Projects</h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="mb-3 rounded border border-[hsl(0,0%,90%)] p-3">
              <div className="flex justify-between items-baseline">
                <span className={s.subtitleText}>{proj.title}</span>
                <div className="flex items-center gap-2">
                  {proj.githubUrl && <Github className="h-3 w-3 text-[hsl(0,0%,40%)]" />}
                  {proj.liveUrl && <ExternalLink className="h-3 w-3 text-[hsl(0,0%,40%)]" />}
                </div>
              </div>
              <p className={cn(s.bodyText, "mt-0.5")}>{proj.description}</p>
              {proj.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {proj.techStack.map((t) => (
                    <span
                      key={t}
                      className="inline-block rounded px-1.5 py-0.5 text-[9px] font-medium"
                      style={{ backgroundColor: accent + "15", color: accent }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {allSkills.length > 0 && (
        <section className="mb-4">
          <h2 className={s.sectionTitle} style={{ color: accent, borderColor: accent + "40" }}>Skills</h2>
          <SkillGroup label="Technical" items={skills.technical} />
          <SkillGroup label="Soft Skills" items={skills.soft} />
          <SkillGroup label="Tools" items={skills.tools} />
        </section>
      )}
    </>
  );
};

/* ── Classic Template ── */
const ClassicTemplate = ({ resume, accent }: { resume: ResumeData; accent: string }) => {
  const s = {
    sectionTitle: "text-[10px] font-bold uppercase tracking-[0.15em] border-b pb-1 mb-2",
    bodyText: "text-[11px] leading-relaxed text-[hsl(0,0%,25%)]",
    subtitleText: "text-[11px] font-semibold text-[hsl(0,0%,7%)]",
    dateText: "text-[10px] text-[hsl(0,0%,40%)]",
    italicText: "text-[11px] text-[hsl(0,0%,40%)] italic",
  };

  return (
    <div className="p-8">
      {resume.personal.name && (
        <div className="border-b pb-4 mb-5" style={{ borderColor: accent + "40" }}>
          <h1 className="text-xl font-bold tracking-tight text-center text-[hsl(0,0%,7%)]" style={{ fontFamily: "var(--font-heading)" }}>
            {resume.personal.name}
          </h1>
          <div className="mt-1.5 flex items-center justify-center gap-3 flex-wrap text-[11px] text-[hsl(0,0%,40%)]">
            {resume.personal.email && <span>{resume.personal.email}</span>}
            {resume.personal.phone && <><span>·</span><span>{resume.personal.phone}</span></>}
            {resume.personal.location && <><span>·</span><span>{resume.personal.location}</span></>}
          </div>
          {(resume.links.github || resume.links.linkedin) && (
            <div className="mt-1 flex items-center justify-center gap-3 text-[11px] text-[hsl(0,0%,40%)]">
              {resume.links.github && <span>{resume.links.github}</span>}
              {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
            </div>
          )}
        </div>
      )}
      <SectionContent resume={resume} s={s} accent={accent} />
    </div>
  );
};

/* ── Modern Template (Two-column) ── */
const ModernTemplate = ({ resume, accent }: { resume: ResumeData; accent: string }) => {
  const allSkills = flattenSkills(resume.skills);
  const skills = typeof resume.skills === "string"
    ? { technical: allSkills, soft: [] as string[], tools: [] as string[] }
    : resume.skills;

  const mainStyles = {
    sectionTitle: "text-[11px] font-bold uppercase tracking-[0.12em] border-b-2 pb-1 mb-2",
    bodyText: "text-[11px] leading-relaxed text-[hsl(0,0%,25%)]",
    subtitleText: "text-[11px] font-bold text-[hsl(0,0%,7%)]",
    dateText: "text-[10px] text-[hsl(0,0%,40%)]",
    italicText: "text-[11px] text-[hsl(0,0%,40%)]",
  };

  const SidebarSkills = ({ label, items }: { label: string; items: string[] }) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-2">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70 mb-1">{label}</p>
        <div className="flex flex-wrap gap-1">
          {items.map((s) => (
            <span key={s} className="text-[9px] bg-white/15 text-white/90 rounded px-1.5 py-0.5">{s}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-[600px]">
      {/* Sidebar */}
      <div className="w-[35%] text-white p-5 space-y-4" style={{ backgroundColor: accent }}>
        {resume.personal.name && (
          <div>
            <h1 className="text-base font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
              {resume.personal.name}
            </h1>
          </div>
        )}

        {/* Contact */}
        <div className="space-y-1.5">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70">Contact</p>
          {resume.personal.email && (
            <div className="flex items-center gap-1.5 text-[10px] text-white/90">
              <Mail className="h-2.5 w-2.5 shrink-0" /><span>{resume.personal.email}</span>
            </div>
          )}
          {resume.personal.phone && (
            <div className="flex items-center gap-1.5 text-[10px] text-white/90">
              <Phone className="h-2.5 w-2.5 shrink-0" /><span>{resume.personal.phone}</span>
            </div>
          )}
          {resume.personal.location && (
            <div className="flex items-center gap-1.5 text-[10px] text-white/90">
              <MapPin className="h-2.5 w-2.5 shrink-0" /><span>{resume.personal.location}</span>
            </div>
          )}
        </div>

        {/* Links */}
        {(resume.links.github || resume.links.linkedin) && (
          <div className="space-y-1.5">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70">Links</p>
            {resume.links.github && (
              <div className="flex items-center gap-1.5 text-[10px] text-white/90">
                <Github className="h-2.5 w-2.5 shrink-0" /><span className="break-all">{resume.links.github}</span>
              </div>
            )}
            {resume.links.linkedin && (
              <div className="text-[10px] text-white/90 break-all">{resume.links.linkedin}</div>
            )}
          </div>
        )}

        {/* Skills in sidebar */}
        {allSkills.length > 0 && (
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-white/70 mb-2">Skills</p>
            <SidebarSkills label="Technical" items={skills.technical} />
            <SidebarSkills label="Soft" items={skills.soft} />
            <SidebarSkills label="Tools" items={skills.tools} />
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        {resume.summary && (
          <section className="mb-4">
            <h2 className={mainStyles.sectionTitle} style={{ color: accent, borderColor: accent }}>Summary</h2>
            <p className={mainStyles.bodyText}>{resume.summary}</p>
          </section>
        )}

        {resume.education.length > 0 && (
          <section className="mb-4">
            <h2 className={mainStyles.sectionTitle} style={{ color: accent, borderColor: accent }}>Education</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className={mainStyles.subtitleText}>{edu.institution}</span>
                  <span className={mainStyles.dateText}>{edu.year}</span>
                </div>
                <p className={mainStyles.italicText}>{edu.degree}</p>
              </div>
            ))}
          </section>
        )}

        {resume.experience.length > 0 && (
          <section className="mb-4">
            <h2 className={mainStyles.sectionTitle} style={{ color: accent, borderColor: accent }}>Experience</h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <span className={mainStyles.subtitleText}>{exp.role}</span>
                  <span className={mainStyles.dateText}>{exp.duration}</span>
                </div>
                <p className={mainStyles.italicText}>{exp.company}</p>
                <p className={cn(mainStyles.bodyText, "mt-0.5")}>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {resume.projects.length > 0 && (
          <section className="mb-4">
            <h2 className={mainStyles.sectionTitle} style={{ color: accent, borderColor: accent }}>Projects</h2>
            {resume.projects.map((proj) => (
              <div key={proj.id} className="mb-3 rounded border border-[hsl(0,0%,90%)] p-3">
                <div className="flex justify-between items-baseline">
                  <span className={mainStyles.subtitleText}>{proj.title}</span>
                  <div className="flex items-center gap-2">
                    {proj.githubUrl && <Github className="h-3 w-3 text-[hsl(0,0%,40%)]" />}
                    {proj.liveUrl && <ExternalLink className="h-3 w-3 text-[hsl(0,0%,40%)]" />}
                  </div>
                </div>
                <p className={cn(mainStyles.bodyText, "mt-0.5")}>{proj.description}</p>
                {proj.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.techStack.map((t) => (
                      <span key={t} className="inline-block rounded px-1.5 py-0.5 text-[9px] font-medium" style={{ backgroundColor: accent + "15", color: accent }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

/* ── Minimal Template ── */
const MinimalTemplate = ({ resume, accent }: { resume: ResumeData; accent: string }) => {
  const s = {
    sectionTitle: "text-[9px] font-semibold uppercase tracking-[0.2em] mb-2",
    bodyText: "text-[10px] leading-relaxed text-[hsl(0,0%,30%)]",
    subtitleText: "text-[10px] font-semibold text-[hsl(0,0%,7%)]",
    dateText: "text-[9px] text-[hsl(0,0%,50%)]",
    italicText: "text-[10px] text-[hsl(0,0%,50%)]",
  };

  return (
    <div className="p-6">
      {resume.personal.name && (
        <div className="pb-3 mb-4">
          <h1 className="text-lg font-semibold tracking-tight text-[hsl(0,0%,7%)]">
            {resume.personal.name}
          </h1>
          <div className="mt-1 flex items-center gap-2 flex-wrap text-[10px] text-[hsl(0,0%,50%)]">
            {resume.personal.email && <span>{resume.personal.email}</span>}
            {resume.personal.phone && <><span>·</span><span>{resume.personal.phone}</span></>}
            {resume.personal.location && <><span>·</span><span>{resume.personal.location}</span></>}
          </div>
          {(resume.links.github || resume.links.linkedin) && (
            <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[hsl(0,0%,50%)]">
              {resume.links.github && <span>{resume.links.github}</span>}
              {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
            </div>
          )}
        </div>
      )}
      <SectionContent resume={resume} s={s} accent={accent} />
    </div>
  );
};

/* ── Main Component ── */
const ResumePreviewPanel = ({
  resume,
  template = "classic",
  accentColor = "teal",
}: {
  resume: ResumeData;
  template?: ResumeTemplate;
  accentColor?: ResumeAccentColor;
}) => {
  const hasContent =
    resume.personal.name ||
    resume.summary ||
    resume.education.length > 0 ||
    resume.experience.length > 0 ||
    resume.projects.length > 0 ||
    flattenSkills(resume.skills).length > 0;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full min-h-[600px] border rounded-md bg-white">
        <p className="text-caption text-muted-foreground text-center px-8">
          Fill out the form to see your resume preview here.
        </p>
      </div>
    );
  }

  const accent = ACCENT_COLORS[accentColor];

  return (
    <div className="border rounded-md bg-white min-h-[600px] text-[hsl(0,0%,7%)] overflow-hidden">
      {template === "classic" && <ClassicTemplate resume={resume} accent={accent} />}
      {template === "modern" && <ModernTemplate resume={resume} accent={accent} />}
      {template === "minimal" && <MinimalTemplate resume={resume} accent={accent} />}
    </div>
  );
};

export default ResumePreviewPanel;
