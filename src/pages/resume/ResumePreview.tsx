import { useResumeData } from "@/hooks/use-resume-data";
import { useResumeTemplate } from "@/hooks/use-resume-template";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import TemplateTabs from "@/components/resume/TemplateTabs";

const ResumePreview = () => {
  const { resume } = useResumeData();
  const { template, setTemplate } = useResumeTemplate();

  return (
    <main className="flex-1 flex items-start justify-center p-6 md:p-10 bg-muted/30">
      <div className="w-full max-w-[640px]">
        <div className="flex items-center justify-between mb-4">
          <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider">Resume Preview</p>
          <TemplateTabs active={template} onChange={setTemplate} />
        </div>
        <ResumePreviewPanel resume={resume} template={template} />
      </div>
    </main>
  );
};

export default ResumePreview;
