import React from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, HelpCircle, Settings2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "no_match", label: "No Match", color: "#1f2937" },
  { id: "bus", label: "Bus", color: "#1f2937" },
  { id: "fx", label: "FX", color: "#7c3aed" },
  { id: "vca", label: "VCA", color: "#0d9488" },
  { id: "aux", label: "Aux", color: "#0d9488" },
  { id: "instr", label: "Instr", color: "#16a34a" },
];

export default function PaletteToolbar({ activeFilters, onToggleFilter, onConform, version = "3.2.4" }) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-1">
      <button
        onClick={onConform}
        className="group flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
      >
        <Wand2 className="h-3.5 w-3.5 text-violet-400" />
        Conform
      </button>

      <div className="mx-1 h-5 w-px bg-white/10" />

      <div className="flex flex-wrap items-center gap-1.5">
        {FILTERS.map((f) => {
          const active = activeFilters.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => onToggleFilter(f.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ring-1 transition",
                active
                  ? "bg-white/10 text-white ring-white/20"
                  : "bg-transparent text-zinc-400 ring-white/5 hover:bg-white/5 hover:text-zinc-200"
              )}
            >
              <span
                className="h-3 w-3 rounded-[3px] ring-1 ring-black/20"
                style={{ backgroundColor: f.color }}
              />
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white">
          <Settings2 className="h-3.5 w-3.5" />
          Options
        </button>
        <button className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white">
          <HelpCircle className="h-3.5 w-3.5" />
          Help
        </button>
        <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-zinc-500 ring-1 ring-white/10">
          v{version}
        </span>
      </div>
    </div>
  );
}