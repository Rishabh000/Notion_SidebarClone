"use client";

import { useState, ReactNode, useCallback } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { COLORS, ICON } from "./constants";

interface SidebarSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  onAdd?: () => void;
}

export function SidebarSection({
  title,
  defaultOpen = true,
  children,
  onAdd,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className="mt-3">
      {/* Section header */}
      <div className="group flex items-center justify-between px-3 py-0.5 cursor-pointer select-none">
        <button
          className="flex items-center gap-0.5 text-xs font-medium"
          style={{ color: COLORS.text.secondary }}
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-label={`${title} section`}
        >
          <ChevronDown
            size={ICON.tinySize}
            className={`transition-transform duration-150 opacity-0 group-hover:opacity-100 ${
              isOpen ? "" : "-rotate-90"
            }`}
            style={{ color: COLORS.text.tertiary }}
          />
          <span className="leading-none">{title}</span>
        </button>
        {onAdd && (
          <button
            className="p-0.5 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-100 hover:bg-[rgba(55,53,47,0.08)]"
            style={{ color: COLORS.text.tertiary }}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            title={`Add page to ${title}`}
            aria-label={`Add page to ${title}`}
          >
            <Plus size={ICON.smallSize} />
          </button>
        )}
      </div>
      {/* Section content with smooth collapse */}
      <div
        className="overflow-hidden transition-all duration-200 ease-in-out"
        style={{
          maxHeight: isOpen ? "2000px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-1">{children}</div>
      </div>
    </div>
  );
}
