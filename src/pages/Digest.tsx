import { Mail } from "lucide-react";

const Digest = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-10 py-24">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
          <Mail className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="font-heading text-headline text-foreground">No digests yet</h1>
        <p className="mt-3 text-body text-muted-foreground">
          Your daily 9AM job digest summaries will appear here once matching is enabled.
        </p>
      </div>
    </main>
  );
};

export default Digest;
