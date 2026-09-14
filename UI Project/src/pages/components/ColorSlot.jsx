import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

function readable(hex) {
  if (!hex) return "#000";
  const c = hex.replace("#", "");
  if (c.length !== 6) return "#000";
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? "#0a0a0a" : "#ffffff";
}

export default function ColorSlot({ slot, isSelected, onSelect, onRename }) {
  return (
    <motion.div
      layout
      onClick={() => onSelect(slot.id)}
      className={cn(
        "group relative flex cursor-pointer items-center gap-1.5 rounded-lg p-1 ring-1 transition",
        isSelected
          ? "bg-white/10 ring-violet-400/60"
          : "bg-white/[0.02] ring-white/5 hover:bg-white/[0.06] hover:ring-white/10"
      )}
    >
      <span className="w-5 shrink-0 text-right font-mono text-[9px] text-zinc-500">
        {slot.index}
      </span>

      <div
        className="relative h-6 w-6 shrink-0 overflow-hidden rounded-md ring-1 ring-black/20"
        style={{ backgroundColor: slot.color }}
      >
        {slot.icon && (
          <span className="absolute inset-0 flex items-center justify-center text-[11px] leading-none">
            {slot.icon}
          </span>
        )}
        {isSelected && !slot.icon && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: readable(slot.color) }}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </motion.span>
        )}
      </div>

      <input
        value={slot.name}
        onChange={(e) => onRename(slot.id, e.target.value)}
        onClick={(e) => e.stopPropagation()}
        placeholder={slot.iconLabel || slot.category || "—"}
        className="w-full min-w-0 flex-1 rounded-md bg-transparent px-1.5 py-1 text-xs text-zinc-200 outline-none placeholder:text-zinc-600 focus:bg-white/5"
      />
    </motion.div>
  );
}