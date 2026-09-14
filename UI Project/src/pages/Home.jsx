import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Sparkles } from "lucide-react";
import PaletteToolbar from "@/components/palette/PaletteToolbar";
import PaletteGrid from "@/components/palette/PaletteGrid";
import IconPicker from "@/components/palette/IconPicker";

function buildPalette() {
  const palette = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
    "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7",
    "#d946ef", "#ec4899", "#f43f5e", "#fb7185", "#fde68a", "#bbf7d0",
    "#a5f3fc", "#bfdbfe", "#ddd6fe", "#f5d0fe", "#fdba74", "#c084fc",
  ];
  return palette.map((color, i) => ({
    id: i + 1,
    index: i + 1,
    color,
    name: "",
    icon: "",
    iconLabel: "",
    category: "Color",
  }));
}

export default function Home() {
  const [slots, setSlots] = useState(buildPalette);
  const [selectedId, setSelectedId] = useState(1);
  const [activeFilters, setActiveFilters] = useState([]);

  const selected = slots.find((s) => s.id === selectedId);

  const toggleFilter = (id) =>
    setActiveFilters((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const updateSlot = (id, patch) =>
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const renameSlot = (id, name) => updateSlot(id, { name });
  const assignIcon = (id, item) => updateSlot(id, { icon: item.icon, iconLabel: item.label, name: item.label });
  const resetAll = () => setSlots(buildPalette());

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-3 py-4 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">Orbit Panel</h1>
              <p className="text-[11px] text-zinc-500">Color palette editor</p>
              </div>
              <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-zinc-400 ring-1 ring-white/10 sm:flex">
                <Sparkles className="h-3 w-3 text-violet-400" /> 24 slots
              </span>
          </div>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5 rounded-2xl bg-white/[0.03] p-3 ring-1 ring-white/5"
        >
          <PaletteToolbar
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            onConform={resetAll}
          />
        </motion.div>

        {/* Main grid + editor */}
        <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PaletteGrid
              title="Color Palette"
              accent="#8b5cf6"
              slots={slots}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onRename={renameSlot}
              columns={3}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="min-h-0"
          >
            <IconPicker
              selectedSlot={selected}
              onAssign={assignIcon}
              onReset={resetAll}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}