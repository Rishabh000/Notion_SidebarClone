"use client";

import { useEffect, useRef } from "react";
import { Undo2, X, Trash2 } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

export function TrashPanel() {
  const { isTrashOpen, setTrashOpen, trashedPages, restorePage, permanentlyDelete } =
    useSidebar();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTrashOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setTrashOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTrashOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isTrashOpen, setTrashOpen]);

  if (!isTrashOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute bottom-10 left-2 right-2 rounded-lg shadow-xl border z-30 overflow-hidden"
      style={{
        backgroundColor: "white",
        borderColor: COLORS.border,
        maxHeight: "320px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2.5 border-b"
        style={{ borderColor: COLORS.border }}
      >
        <div className="flex items-center gap-2">
          <Trash2 size={ICON.smallSize} style={{ color: COLORS.text.secondary }} />
          <span
            className="text-sm font-medium"
            style={{ color: COLORS.text.primary }}
          >
            Trash
          </span>
        </div>
        <button
          className="p-1 rounded hover:bg-[rgba(55,53,47,0.04)]"
          onClick={() => setTrashOpen(false)}
        >
          <X size={ICON.smallSize} style={{ color: COLORS.text.tertiary }} />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: "260px" }}>
        {trashedPages.length === 0 ? (
          <div
            className="px-4 py-8 text-center text-sm"
            style={{ color: COLORS.text.secondary }}
          >
            No pages in trash
          </div>
        ) : (
          trashedPages.map((page) => (
            <div
              key={page.id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-[rgba(55,53,47,0.04)] group"
            >
              <span className="text-base">{page.icon}</span>
              <span
                className="flex-1 truncate text-sm"
                style={{ color: COLORS.text.primary }}
              >
                {page.title}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1 rounded hover:bg-[rgba(55,53,47,0.08)]"
                  title="Restore"
                  onClick={() => restorePage(page.id)}
                >
                  <Undo2 size={14} style={{ color: COLORS.text.secondary }} />
                </button>
                <button
                  className="p-1 rounded hover:bg-[rgba(227,68,68,0.08)]"
                  title="Delete permanently"
                  onClick={() => permanentlyDelete(page.id)}
                >
                  <Trash2 size={14} style={{ color: COLORS.accent.red }} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
