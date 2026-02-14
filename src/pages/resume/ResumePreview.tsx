import { useResumeData } from "@/hooks/use-resume-data";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";

const ResumePreview = () => {
  const { resume } = useResumeData();

  return (
    <main className="flex-1 flex items-start justify-center p-6 md:p-10 bg-muted/30">
      <div className="w-full max-w-[640px]">
        <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">Resume Preview</p>
        <ResumePreviewPanel resume={resume} />
      </div>
    </main>
  );
};

export default ResumePreview;
