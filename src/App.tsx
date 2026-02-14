import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PlacementLayout from "./layouts/PlacementLayout";
import RbLayout from "./layouts/RbLayout";
import ResumeLayout from "./layouts/ResumeLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Saved from "./pages/Saved";
import Digest from "./pages/Digest";
import Settings from "./pages/Settings";
import Proof from "./pages/Proof";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlacementLanding from "./pages/placement/PlacementLanding";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import Practice from "./pages/placement/Practice";
import Assessments from "./pages/placement/Assessments";
import Resources from "./pages/placement/Resources";
import PlacementProfile from "./pages/placement/PlacementProfile";

import RbProof from "./pages/rb/RbProof";
import ResumeHome from "./pages/resume/ResumeHome";
import ResumeBuilder from "./pages/resume/ResumeBuilder";
import ResumePreview from "./pages/resume/ResumePreview";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing has its own nav */}
          <Route path="/" element={<Landing />} />

          {/* App shell with shared nav */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/job/proof" element={<Proof />} />
          </Route>

          {/* Placement Platform */}
          <Route path="/placement" element={<PlacementLanding />} />
          <Route element={<PlacementLayout />}>
            <Route path="/placement/dashboard" element={<PlacementDashboard />} />
            <Route path="/placement/practice" element={<Practice />} />
            <Route path="/placement/assessments" element={<Assessments />} />
            <Route path="/placement/resources" element={<Resources />} />
            <Route path="/placement/proof" element={<PlacementProfile />} />
          </Route>

          {/* AI Resume Builder — Proof (Project 3) */}
          <Route element={<RbLayout />}>
            <Route path="/resume/proof" element={<RbProof />} />
          </Route>

          {/* AI Resume Builder — App */}
          <Route element={<ResumeLayout />}>
            <Route path="/resume" element={<ResumeHome />} />
            <Route path="/resume/builder" element={<ResumeBuilder />} />
            <Route path="/resume/preview" element={<ResumePreview />} />
            
          </Route>

          {/* Design system reference */}
          <Route path="/design-system" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
