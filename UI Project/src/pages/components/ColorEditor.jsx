import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pipette, RotateCcw, Copy, ClipboardPaste, Scissors, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

function hexToHsl(hex) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return { h: 0, s: 0, l: 0 };
  let r = parseInt(c.slice(0, 2), 16) / 255;
  let g = parseInt(c.slice(2, 4), 16) / 255;
  let b = parseInt(c.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function Slider({ label, value, min, max, onChange, accent }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">{label}</span>
        <span className="font-mono text-xs text-zinc-300">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none
          [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:ring-1 [&::-webkit-slider-thumb]:ring-black/20"
        style={{ background: accent }}
      />
    </div>
  );
}

export default function ColorEditor({ slot, onUpdateColor, onDarken, onLighten, onReset, onCopyColor, onPasteColor, onCutName, clipboardColor, moveNameWithColor, setMoveNameWithColor }) {
  const [hex, setHex] = useState(slot?.color || "#000000");
  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0 });

  useEffect(() => {
    if (slot) {
      setHex(slot.color);
      setHsl(hexToHsl(slot.color));
    }
  }, [slot?.id, slot?.color]);

  if (!slot) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white/[0.02] p-6 text-center ring-1 ring-white/5">
        <Pipette className="mb-2 h-6 w-6 text-zinc-600" />
        <p className="text-xs text-zinc-500">Select a color slot to edit</p>
      </div>
    );
  }

  const applyHsl = (next) => {
    const c = hslToHex(next.h, next.s, next.l);
    setHsl(next);
    setHex(c);
    onUpdateColor(slot.id, c);
  };

  const applyHex = (val) => {
    setHex(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setHsl(hexToHsl(val));
      onUpdateColor(slot.id, val);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white/[0.02] p-3 ring-1 ring-white/5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div
          className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-black/20"
          style={{ backgroundColor: slot.color }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-zinc-500">#{slot.index}</span>
            <span className="truncate text-xs font-semibold text-white">{slot.name || "Untitled"}</span>
          </div>
          <span className="text-[10px] text-zinc-500">{slot.category || "Custom"}</span>
        </div>
      </div>

      {/* Hex */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Hex</span>
        <div className="flex items-center gap-2 rounded-lg bg-black/30 px-3 py-2 ring-1 ring-white/10">
          <Pipette className="h-3.5 w-3.5 text-zinc-500" />
          <input
            value={hex.toUpperCase()}
            onChange={(e) => applyHex(e.target.value)}
            className="w-full bg-transparent font-mono text-sm text-white outline-none"
          />
        </div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-3">
        <Slider
          label="Hue"
          min={0}
          max={360}
          value={hsl.h}
          accent="linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
          onChange={(h) => applyHsl({ ...hsl, h })}
        />
        <Slider
          label="Sat %"
          min={0}
          max={100}
          value={hsl.s}
          accent={`linear-gradient(to right, ${hslToHex(hsl.h, 0, hsl.l)}, ${hslToHex(hsl.h, 100, hsl.l)})`}
          onChange={(s) => applyHsl({ ...hsl, s })}
        />
        <Slider
          label="Lum %"
          min={0}
          max={100}
          value={hsl.l}
          accent={`linear-gradient(to right, #000000, ${hslToHex(hsl.h, hsl.s, 50)}, #ffffff)`}
          onChange={(l) => applyHsl({ ...hsl, l })}
        />
      </div>

      <button
        onClick={() => applyHsl({ h: 0, s: 0, l: 0 })}
        className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 py-2 text-xs font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset Color
      </button>

      <div className="h-px bg-white/5" />

      {/* Bulk actions */}
      <div>
        <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">Bulk</span>
        <div className="grid grid-cols-3 gap-1.5">
          <button onClick={onDarken} className="flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2 text-[11px] font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white">
            <ArrowDown className="h-3 w-3" /> Darken
          </button>
          <button onClick={onLighten} className="flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2 text-[11px] font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white">
            <ArrowUp className="h-3 w-3" /> Lighten
          </button>
          <button onClick={onReset} className="flex items-center justify-center gap-1 rounded-lg bg-white/5 py-2 text-[11px] font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      <div className="h-px bg-white/5" />

      {/* Copy / paste */}
      <div>
        <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">Copy / Paste</span>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onCopyColor(slot.color)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 py-2 text-[11px] font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
          >
            <Copy className="h-3 w-3" /> Copy Color
          </button>
          <button
            onClick={() => onPasteColor(slot.id)}
            disabled={!clipboardColor}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-medium ring-1 transition",
              clipboardColor
                ? "bg-white/5 text-zinc-300 ring-white/10 hover:bg-white/10 hover:text-white"
                : "cursor-not-allowed bg-white/[0.02] text-zinc-600 ring-white/5"
            )}
          >
            <ClipboardPaste className="h-3 w-3" /> Paste Color
          </button>
        </div>
        <label className="mt-2 flex cursor-pointer items-center gap-2 text-[11px] text-zinc-400">
          <input
            type="checkbox"
            checked={moveNameWithColor}
            onChange={(e) => setMoveNameWithColor(e.target.checked)}
            className="h-3.5 w-3.5 accent-violet-500"
          />
          Move name with color
        </label>
        {clipboardColor && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-black/20 px-2 py-1.5">
            <span className="h-4 w-4 rounded ring-1 ring-black/20" style={{ backgroundColor: clipboardColor }} />
            <span className="font-mono text-[10px] text-zinc-500">clipboard: {clipboardColor.toUpperCase()}</span>
          </div>
        )}
      </div>

      <div className="h-px bg-white/5" />

      {/* Name actions */}
      <div>
        <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">Name</span>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onCutName(slot.id)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-white/5 py-2 text-[11px] font-medium text-zinc-300 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
          >
            <Scissors className="h-3 w-3" /> Cut Name
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-lg bg-white/[0.02] py-2 text-[11px] font-medium text-zinc-600 ring-1 ring-white/5">
            <ClipboardPaste className="h-3 w-3" /> Paste Name
          </button>
        </div>
      </div>
    </div>
  );
}
