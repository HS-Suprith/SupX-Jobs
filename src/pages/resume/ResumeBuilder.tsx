import { useResumeData } from "@/hooks/use-resume-data";
import { useResumeTemplate } from "@/hooks/use-resume-template";
import { sampleResume } from "@/data/resume-types";
import type { ResumeEducation, ResumeExperience, ResumeProject } from "@/data/resume-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import AtsScorePanel from "@/components/resume/AtsScorePanel";
import TemplateTabs from "@/components/resume/TemplateTabs";
import BulletGuidance from "@/components/resume/BulletGuidance";
import {
  Plus,
  Trash2,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Wrench,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

const ResumeBuilder = () => {
  const { resume, updateField, loadData } = useResumeData();
  const { template, setTemplate } = useResumeTemplate();

  const handleLoadSample = () => {
    loadData(sampleResume);
    toast.success("Sample data loaded");
  };

  /* ── List helpers ── */
  const addEducation = () => {
    const entry: ResumeEducation = { id: crypto.randomUUID(), institution: "", degree: "", year: "" };
    updateField("education", [...resume.education, entry]);
  };

  const updateEducation = (id: string, field: keyof ResumeEducation, value: string) => {
    updateField("education", resume.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const removeEducation = (id: string) => {
    updateField("education", resume.education.filter((e) => e.id !== id));
  };

  const addExperience = () => {
    const entry: ResumeExperience = { id: crypto.randomUUID(), company: "", role: "", duration: "", description: "" };
    updateField("experience", [...resume.experience, entry]);
  };

  const updateExperience = (id: string, field: keyof ResumeExperience, value: string) => {
    updateField("experience", resume.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const removeExperience = (id: string) => {
    updateField("experience", resume.experience.filter((e) => e.id !== id));
  };

  const addProject = () => {
    const entry: ResumeProject = { id: crypto.randomUUID(), title: "", description: "", techStack: "" };
    updateField("projects", [...resume.projects, entry]);
  };

  const updateProject = (id: string, field: keyof ResumeProject, value: string) => {
    updateField("projects", resume.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removeProject = (id: string) => {
    updateField("projects", resume.projects.filter((p) => p.id !== id));
  };

  return (
    <main className="flex-1 flex flex-col lg:flex-row">
      {/* Left — Form */}
      <div className="flex-1 overflow-y-auto border-r p-6 md:p-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-headline text-foreground">Resume Builder</h1>
          <Button variant="outline" size="sm" onClick={handleLoadSample} className="gap-1.5">
            <FileText className="h-3.5 w-3.5" /> Load Sample Data
          </Button>
        </div>

        {/* Personal Info */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <User className="h-4 w-4" /> Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Arjun Sharma" value={resume.personal.name} onChange={(e) => updateField("personal", { ...resume.personal, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="arjun@email.com" value={resume.personal.email} onChange={(e) => updateField("personal", { ...resume.personal, email: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="+91 98765 43210" value={resume.personal.phone} onChange={(e) => updateField("personal", { ...resume.personal, phone: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Bengaluru, India" value={resume.personal.location} onChange={(e) => updateField("personal", { ...resume.personal, location: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <FileText className="h-4 w-4" /> Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea rows={4} placeholder="A brief professional summary..." value={resume.summary} onChange={(e) => updateField("summary", e.target.value)} className="resize-y" />
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <GraduationCap className="h-4 w-4" /> Education
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={addEducation} className="gap-1.5 text-muted-foreground">
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {resume.education.length === 0 && (
              <p className="text-caption text-muted-foreground">No entries yet. Click "Add" to begin.</p>
            )}
            {resume.education.map((edu) => (
              <div key={edu.id} className="grid gap-3 md:grid-cols-3 border-b pb-4 last:border-0 last:pb-0">
                <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
                <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                <div className="flex gap-2">
                  <Input placeholder="Year" value={edu.year} onChange={(e) => updateEducation(edu.id, "year", e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)} className="shrink-0 text-muted-foreground h-9 w-9">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <Briefcase className="h-4 w-4" /> Experience
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={addExperience} className="gap-1.5 text-muted-foreground">
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {resume.experience.length === 0 && (
              <p className="text-caption text-muted-foreground">No entries yet. Click "Add" to begin.</p>
            )}
            {resume.experience.map((exp) => (
              <div key={exp.id} className="space-y-3 border-b pb-4 last:border-0 last:pb-0">
                <div className="grid gap-3 md:grid-cols-3">
                  <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                  <Input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
                  <div className="flex gap-2">
                    <Input placeholder="Duration" value={exp.duration} onChange={(e) => updateExperience(exp.id, "duration", e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeExperience(exp.id)} className="shrink-0 text-muted-foreground h-9 w-9">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Textarea placeholder="Description" rows={2} value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} className="resize-y" />
                  <BulletGuidance text={exp.description} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <FolderKanban className="h-4 w-4" /> Projects
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={addProject} className="gap-1.5 text-muted-foreground">
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {resume.projects.length === 0 && (
              <p className="text-caption text-muted-foreground">No entries yet. Click "Add" to begin.</p>
            )}
            {resume.projects.map((proj) => (
              <div key={proj.id} className="space-y-3 border-b pb-4 last:border-0 last:pb-0">
                <div className="grid gap-3 md:grid-cols-2">
                  <Input placeholder="Project Title" value={proj.title} onChange={(e) => updateProject(proj.id, "title", e.target.value)} />
                  <div className="flex gap-2">
                    <Input placeholder="Tech Stack" value={proj.techStack} onChange={(e) => updateProject(proj.id, "techStack", e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeProject(proj.id)} className="shrink-0 text-muted-foreground h-9 w-9">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Textarea placeholder="Description" rows={2} value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} className="resize-y" />
                  <BulletGuidance text={proj.description} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <Wrench className="h-4 w-4" /> Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="JavaScript, React, Python, SQL, Git..." value={resume.skills} onChange={(e) => updateField("skills", e.target.value)} />
            <p className="text-caption text-muted-foreground mt-1.5">Comma-separated list of skills.</p>
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <LinkIcon className="h-4 w-4" /> Links
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" placeholder="https://github.com/..." value={resume.links.github} onChange={(e) => updateField("links", { ...resume.links, github: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" placeholder="https://linkedin.com/in/..." value={resume.links.linkedin} onChange={(e) => updateField("links", { ...resume.links, linkedin: e.target.value })} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right — Live Preview + ATS */}
      <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 overflow-y-auto p-6 md:p-8 bg-muted/30 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider">Live Preview</p>
            <TemplateTabs active={template} onChange={setTemplate} />
          </div>
          <ResumePreviewPanel resume={resume} template={template} />
        </div>
        <AtsScorePanel resume={resume} />
      </div>
    </main>
  );
};

export default ResumeBuilder;
