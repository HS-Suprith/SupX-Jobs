import { ClipboardCheck } from "lucide-react";

const Proof = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-10 py-24">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <ClipboardCheck className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="font-heading text-headline text-foreground">Proof of Work</h1>
        <p className="mt-3 text-body text-muted-foreground">
          Artifacts, screenshots, and build evidence will be collected here in a future step.
        </p>
      </div>
    </main>
  );
};

export default Proof;
