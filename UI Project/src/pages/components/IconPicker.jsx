import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_LIBRARY = {
  Brass: [
    { icon: "🎺", label: "Brass Section" },
    { icon: "🎺", label: "Cornet" },
    { icon: "🎺", label: "Flugelhorn" },
    { icon: "🎺", label: "French Horn" },
    { icon: "🎺", label: "Trombone" },
    { icon: "🎺", label: "Trumpet" },
    { icon: "🎺", label: "Tuba" },
  ],
  Drums: [
    { icon: "🥁", label: "Drum Set" },
    { icon: "🥁", label: "Drum Pad" },
    { icon: "🥁", label: "Floor Tom" },
    { icon: "🥁", label: "Hi Hat" },
    { icon: "🥁", label: "Kick" },
    { icon: "🥁", label: "Kick In" },
    { icon: "🥁", label: "Kick Out" },
    { icon: "🥁", label: "Snare" },
  ],
  Guitars: [
    { icon: "🎸", label: "Electric" },
    { icon: "🎸", label: "Acoustic" },
    { icon: "🎸", label: "Bass Guitar" },
    { icon: "🪕", label: "Banjo" },
    { icon: "🪕", label: "Mandolin" },
  ],
  Keyboards: [
    { icon: "🎹", label: "Piano" },
    { icon: "🎹", label: "Rhodes" },
    { icon: "🎹", label: "Organ" },
    { icon: "🎹", label: "Synth" },
    { icon: "🎹", label: "Clavinet" },
  ],
  Percussion: [
    { icon: "🪘", label: "Conga" },
    { icon: "🪘", label: "Bongos" },
    { icon: "🪘", label: "Tambourine" },
    { icon: "🔔", label: "Cowbell" },
    { icon: "🪘", label: "Shaker" },
  ],
  Strings: [
    { icon: "🎻", label: "Violin" },
    { icon: "🎻", label: "Viola" },
    { icon: "🎻", label: "Cello" },
    { icon: "🎻", label: "Contrabass" },
    { icon: "🎻", label: "String Section" },
  ],
  Vocals: [
    { icon: "🎤", label: "Lead Vocal" },
    { icon: "🎤", label: "Backing Vocal" },
    { icon: "🎙️", label: "Voice" },
    { icon: "👤", label: "Vocalist" },
  ],
  Woodwinds: [
    { icon: "🎷", label: "Saxophone" },
    { icon: "🪈", label: "Flute" },
    { icon: "🎷", label: "Clarinet" },
    { icon: "🪈", label: "Oboe" },
    { icon: "🎷", label: "Bassoon" },
  ],
  Other: [
    { icon: "🎧", label: "Headphones" },
    { icon: "🎚️", label: "Mixer" },
    { icon: "🎛️", label: "Controller" },
    { icon: "🔊", label: "Speaker" },
    { icon: "🎵", label: "Note" },
    { icon: "🎶", label: "Melody" },
    { icon: "🎼", label: "Score" },
  ],
};

const CATEGORIES = ["All", ...Object.keys(ICON_LIBRARY)];

export default function IconPicker({ selectedSlot, onAssign, onReset }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const icons = useMemo(() => {
    const list = category === "All"
      ? Object.values(ICON_LIBRARY).flat()
      : ICON_LIBRARY[category];
    if (!query.trim()) return list;
    return list.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));
  }, [category, query]);

  return (
    <div className="flex h-full min-h-[300px] flex-col overflow-hidden rounded-xl bg-white/[0.02] ring-1 ring-white/5">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/5 p-2.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Assign Icon</span>
        {selectedSlot && (
          <span className="ml-auto flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[10px] text-zinc-300 ring-1 ring-white/10">
            <span
              className="h-2.5 w-2.5 rounded-[3px] ring-1 ring-black/20"
              style={{ backgroundColor: selectedSlot.color }}
            />
            #{selectedSlot.index}
          </span>
        )}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Category nav */}
        <div className="flex w-24 shrink-0 flex-col border-r border-white/5 p-1.5">
          <div className="flex items-center justify-between px-1 pb-1.5">
            <span className="text-[10px] font-semibold text-zinc-300">{category}</span>
            <ChevronRight className="h-3 w-3 text-violet-400" />
          </div>
          <div className="flex-1 space-y-0.5 overflow-y-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "w-full rounded-md px-2 py-1 text-left text-[11px] transition",
                  cat === category
                    ? "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/30"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={onReset}
            className="mt-1.5 flex items-center justify-center gap-1 rounded-md bg-violet-500 px-2 py-1.5 text-[11px] font-medium text-white transition hover:bg-violet-400"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>

        {/* Icon grid */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col p-2">
          <div className="mb-2 flex items-center gap-1.5 rounded-md bg-black/20 px-2 py-1 ring-1 ring-white/10">
            <Search className="h-3 w-3 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-[11px] text-zinc-200 outline-none placeholder:text-zinc-600"
            />
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-1.5 overflow-y-auto">
            {icons.map((item, i) => {
              const active = selectedSlot?.icon === item.icon && selectedSlot?.iconLabel === item.label;
              return (
                <motion.button
                  key={`${item.label}-${i}`}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => selectedSlot && onAssign(selectedSlot.id, item)}
                  disabled={!selectedSlot}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg p-1.5 ring-1 transition",
                    active
                      ? "bg-violet-500/15 ring-violet-400/40"
                      : "bg-white/[0.02] ring-white/5 hover:bg-white/[0.06] hover:ring-white/10",
                    !selectedSlot && "cursor-not-allowed opacity-40"
                  )}
                >
                  <span className="text-xl leading-none">{item.icon}</span>
                  <span className="w-full truncate text-center text-[9px] text-zinc-400">{item.label}</span>
                </motion.button>
              );
            })}
            {icons.length === 0 && (
              <p className="col-span-3 py-6 text-center text-[11px] text-zinc-600">No icons found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}