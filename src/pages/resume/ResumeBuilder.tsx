import { useState, useCallback } from "react";
import { useResumeData } from "@/hooks/use-resume-data";
import { useResumeTemplate } from "@/hooks/use-resume-template";
import { sampleResume } from "@/data/resume-types";
import type { ResumeEducation, ResumeExperience, ResumeProject, ResumeSkills } from "@/data/resume-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import AtsScorePanel from "@/components/resume/AtsScorePanel";
import TemplateTabs from "@/components/resume/TemplateTabs";
import BulletGuidance from "@/components/resume/BulletGuidance";
import TagInput from "@/components/resume/TagInput";
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
  ChevronDown,
  Sparkles,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const SUGGESTED_SKILLS = {
  technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
  soft: ["Team Leadership", "Problem Solving"],
  tools: ["Git", "Docker", "AWS"],
};

const ResumeBuilder = () => {
  const { resume, updateField, loadData } = useResumeData();
  const { template, setTemplate } = useResumeTemplate();
  const [suggestingSkills, setSuggestingSkills] = useState(false);
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});

  const handleLoadSample = () => {
    loadData(sampleResume);
    toast.success("Sample data loaded");
  };

  /* ── Skills helpers ── */
  const updateSkillCategory = useCallback(
    (category: keyof ResumeSkills, tags: string[]) => {
      updateField("skills", { ...resume.skills, [category]: tags });
    },
    [resume.skills, updateField]
  );

  const handleSuggestSkills = useCallback(() => {
    setSuggestingSkills(true);
    setTimeout(() => {
      const merged: ResumeSkills = {
        technical: [...new Set([...resume.skills.technical, ...SUGGESTED_SKILLS.technical])],
        soft: [...new Set([...resume.skills.soft, ...SUGGESTED_SKILLS.soft])],
        tools: [...new Set([...resume.skills.tools, ...SUGGESTED_SKILLS.tools])],
      };
      updateField("skills", merged);
      setSuggestingSkills(false);
      toast.success("Skills suggested and added");
    }, 1000);
  }, [resume.skills, updateField]);

  /* ── Education helpers ── */
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

  /* ── Experience helpers ── */
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

  /* ── Project helpers ── */
  const addProject = () => {
    const entry: ResumeProject = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      techStack: [],
      liveUrl: "",
      githubUrl: "",
    };
    updateField("projects", [...resume.projects, entry]);
    setOpenProjects((prev) => ({ ...prev, [entry.id]: true }));
  };

  const updateProject = (id: string, field: keyof ResumeProject, value: any) => {
    updateField("projects", resume.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removeProject = (id: string) => {
    updateField("projects", resume.projects.filter((p) => p.id !== id));
  };

  const toggleProject = (id: string) => {
    setOpenProjects((prev) => ({ ...prev, [id]: !prev[id] }));
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
              <Plus className="h-3.5 w-3.5" /> Add Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {resume.projects.length === 0 && (
              <p className="text-caption text-muted-foreground">No projects yet. Click "Add Project" to begin.</p>
            )}
            {resume.projects.map((proj) => (
              <Collapsible
                key={proj.id}
                open={openProjects[proj.id] ?? false}
                onOpenChange={() => toggleProject(proj.id)}
              >
                <div className="border rounded-md">
                  <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-muted/50 transition-colors">
                    <span className="text-body font-medium text-foreground text-left">
                      {proj.title || "Untitled Project"}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProject(proj.id);
                        }}
                        className="shrink-0 text-muted-foreground h-8 w-8"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openProjects[proj.id] ? "rotate-180" : ""}`} />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-3 border-t">
                      <div className="pt-3">
                        <Label>Project Title</Label>
                        <Input
                          placeholder="Project Title"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <Label>Description</Label>
                          <span className={`text-[11px] ${proj.description.length > 200 ? "text-destructive" : "text-muted-foreground"}`}>
                            {proj.description.length}/200
                          </span>
                        </div>
                        <Textarea
                          placeholder="What did you build? What was the impact?"
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            if (e.target.value.length <= 200) {
                              updateProject(proj.id, "description", e.target.value);
                            }
                          }}
                          className="resize-y mt-1.5"
                        />
                        <BulletGuidance text={proj.description} />
                      </div>
                      <div>
                        <Label>Tech Stack</Label>
                        <div className="mt-1.5">
                          <TagInput
                            tags={proj.techStack}
                            onChange={(tags) => updateProject(proj.id, "techStack", tags)}
                            placeholder="Type a technology and press Enter"
                          />
                        </div>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <Label>Live URL <span className="text-muted-foreground font-normal">(optional)</span></Label>
                          <Input
                            placeholder="https://..."
                            value={proj.liveUrl}
                            onChange={(e) => updateProject(proj.id, "liveUrl", e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label>GitHub URL <span className="text-muted-foreground font-normal">(optional)</span></Label>
                          <Input
                            placeholder="https://github.com/..."
                            value={proj.githubUrl}
                            onChange={(e) => updateProject(proj.id, "githubUrl", e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="pb-4 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-caption font-body font-medium text-muted-foreground uppercase tracking-wider">
              <Wrench className="h-4 w-4" /> Skills
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSuggestSkills}
              disabled={suggestingSkills}
              className="gap-1.5 text-muted-foreground"
            >
              {suggestingSkills ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              {suggestingSkills ? "Suggesting..." : "Suggest Skills"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-caption">
                Technical Skills ({resume.skills.technical.length})
              </Label>
              <div className="mt-1.5">
                <TagInput
                  tags={resume.skills.technical}
                  onChange={(tags) => updateSkillCategory("technical", tags)}
                  placeholder="e.g. React, TypeScript..."
                />
              </div>
            </div>
            <div>
              <Label className="text-caption">
                Soft Skills ({resume.skills.soft.length})
              </Label>
              <div className="mt-1.5">
                <TagInput
                  tags={resume.skills.soft}
                  onChange={(tags) => updateSkillCategory("soft", tags)}
                  placeholder="e.g. Team Leadership..."
                />
              </div>
            </div>
            <div>
              <Label className="text-caption">
                Tools & Technologies ({resume.skills.tools.length})
              </Label>
              <div className="mt-1.5">
                <TagInput
                  tags={resume.skills.tools}
                  onChange={(tags) => updateSkillCategory("tools", tags)}
                  placeholder="e.g. Git, Docker..."
                />
              </div>
            </div>
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
