import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export interface Filters {
  keyword: string;
  location: string;
  mode: string;
  experience: string;
  source: string;
  sort: string;
  status: string;
}

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const locations = ["All", "Bangalore", "Chennai", "Hyderabad", "Mumbai", "Pune", "Noida", "Gurgaon", "Kolkata", "Mysore"];
const modes = ["All", "Remote", "Hybrid", "Onsite"];
const experiences = ["All", "Fresher", "0-1", "1-3", "3-5"];
const sources = ["All", "LinkedIn", "Naukri", "Indeed"];
const sorts = ["Latest", "Oldest", "Match Score", "Salary"];
const statuses = ["All", "Not Applied", "Applied", "Rejected", "Selected"];

const FilterBar = ({ filters, onChange }: FilterBarProps) => {
  const update = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search title or company…"
          value={filters.keyword}
          onChange={(e) => update("keyword", e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={filters.location} onValueChange={(v) => update("location", v)}>
        <SelectTrigger className="w-full md:w-[140px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((l) => (
            <SelectItem key={l} value={l}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.mode} onValueChange={(v) => update("mode", v)}>
        <SelectTrigger className="w-full md:w-[120px]">
          <SelectValue placeholder="Mode" />
        </SelectTrigger>
        <SelectContent>
          {modes.map((m) => (
            <SelectItem key={m} value={m}>{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.experience} onValueChange={(v) => update("experience", v)}>
        <SelectTrigger className="w-full md:w-[130px]">
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          {experiences.map((e) => (
            <SelectItem key={e} value={e}>{e}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.source} onValueChange={(v) => update("source", v)}>
        <SelectTrigger className="w-full md:w-[120px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          {sources.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status} onValueChange={(v) => update("status", v)}>
        <SelectTrigger className="w-full md:w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.sort} onValueChange={(v) => update("sort", v)}>
        <SelectTrigger className="w-full md:w-[130px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {sorts.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
