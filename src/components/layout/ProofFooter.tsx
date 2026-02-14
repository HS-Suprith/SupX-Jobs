import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const proofItems = [
  { id: "ui", label: "UI Built" },
  { id: "logic", label: "Logic Working" },
  { id: "test", label: "Test Passed" },
  { id: "deployed", label: "Deployed" },
];

const ProofFooter = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <footer className="border-t px-10 py-6">
      <div className="flex items-center gap-10">
        <span className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
          Proof Checklist
        </span>
        <div className="flex items-center gap-8">
          {proofItems.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-center gap-2 text-caption text-foreground">
              <Checkbox
                checked={checked[item.id] || false}
                onCheckedChange={(val) =>
                  setChecked((prev) => ({ ...prev, [item.id]: val === true }))
                }
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default ProofFooter;
