import { ReactNode } from "react";

interface WorkspaceLayoutProps {
  primary: ReactNode;
  secondary: ReactNode;
}

const WorkspaceLayout = ({ primary, secondary }: WorkspaceLayoutProps) => {
  return (
    <div className="flex flex-1 gap-0">
      <main className="flex-[7] border-r p-10">{primary}</main>
      <aside className="flex-[3] p-10">{secondary}</aside>
    </div>
  );
};

export default WorkspaceLayout;
