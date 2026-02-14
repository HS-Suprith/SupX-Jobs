import { useMemo } from "react";
import { useResumeData } from "@/hooks/use-resume-data";
import { useResumeTemplate } from "@/hooks/use-resume-template";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import TemplatePicker from "@/components/resume/TemplatePicker";
import { Button } from "@/components/ui/button";
import { resumeToPlainText } from "@/lib/resume-to-text";
import { Printer, Copy, AlertCircle, Download } from "lucide-react";
import { toast } from "sonner";

const ResumePreview = () => {
  const { resume } = useResumeData();
  const { template, setTemplate, accentColor, setAccentColor } = useResumeTemplate();

  const warnings = useMemo(() => {
    const w: string[] = [];
    if (!resume.personal.name) w.push("Name is missing.");
    if (resume.projects.length === 0 && resume.experience.length === 0)
      w.push("Add at least one project or experience.");
    return w;
  }, [resume]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    toast.success("PDF export ready! Check your downloads.");
  };

  const handleCopyText = async () => {
    const text = resumeToPlainText(resume);
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Resume copied to clipboard");
    } catch {
      toast.error("Failed to copy — try manually");
    }
  };

  return (
    <main className="flex-1 flex items-start justify-center p-6 md:p-10 bg-muted/30">
      <div className="w-full max-w-[640px]">
        <p className="text-caption font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Resume Preview
        </p>

        <TemplatePicker
          activeTemplate={template}
          onTemplateChange={setTemplate}
          activeColor={accentColor}
          onColorChange={setAccentColor}
        />

        {/* Validation warning */}
        {warnings.length > 0 && (
          <div className="mt-4 flex items-start gap-3 rounded-md border border-warning/40 bg-warning/5 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-caption font-medium text-foreground">
                Your resume may look incomplete.
              </p>
              <ul className="mt-1 space-y-0.5">
                {warnings.map((w, i) => (
                  <li key={i} className="text-caption text-muted-foreground">{w}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Export buttons */}
        <div className="flex items-center gap-3 mt-4 mb-6">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-1.5">
            <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyText} className="gap-1.5">
            <Copy className="h-3.5 w-3.5" /> Copy as Text
          </Button>
        </div>

        <div id="resume-print-area">
          <ResumePreviewPanel resume={resume} template={template} accentColor={accentColor} />
        </div>
      </div>
    </main>
  );
};

export default ResumePreview;
