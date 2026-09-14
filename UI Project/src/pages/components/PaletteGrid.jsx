import React from "react";
import ColorSlot from "./ColorSlot";

export default function PaletteGrid({ title, accent, slots, selectedId, onSelect, onRename, columns = 3 }) {
  return (
    <div className="flex flex-col rounded-xl bg-white/[0.02] p-2.5 ring-1 ring-white/5">
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{title}</h3>
        <span className="ml-auto font-mono text-[10px] text-zinc-600">{slots.length} slots</span>
      </div>
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {slots.map((slot) => (
          <ColorSlot
            key={slot.id}
            slot={slot}
            isSelected={selectedId === slot.id}
            onSelect={onSelect}
            onRename={onRename}
          />
        ))}
      </div>
    </div>
  );
}