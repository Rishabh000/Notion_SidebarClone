"use client";

import { useState, useCallback, ReactNode } from "react";
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react";
import { COLORS, ICON } from "./constants";

interface TeamspaceItemProps {
  name: string;
  icon: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  onAdd?: () => void;
}

export function TeamspaceItem({
  name,
  icon,
  children,
  defaultOpen = true,
  onAdd,
}: TeamspaceItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleOpen();
      }
    },
    [toggleOpen]
  );

  return (
    <div>
      <div
        className="sidebar-item group flex items-center rounded-[4px] cursor-pointer select-none transition-colors duration-75"
        style={{
          padding: "4px 8px",
          minHeight: "30px",
        }}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        role="treeitem"
        tabIndex={0}
        aria-expanded={isOpen}
        title={name}
      >
        {/* Teamspace icon */}
        <div
          className="flex-shrink-0 w-[22px] h-[22px] rounded-[4px] flex items-center justify-center text-white text-[11px] font-semibold mr-2"
          style={{
            backgroundColor: COLORS.accent.teamspace,
            border: "1px solid rgba(255,255,255,0.13)",
          }}
        >
          {icon}
        </div>

        {/* Teamspace name */}
        <span
          className="flex-1 truncate text-sm font-medium leading-[1.2]"
          style={{ color: COLORS.text.primary }}
        >
          {name}
        </span>

        {/* Hover actions */}
        <div className="flex items-center gap-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <button
            className="p-0.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)]"
            style={{ color: COLORS.text.tertiary }}
            onClick={(e) => e.stopPropagation()}
            title="More actions"
          >
            <MoreHorizontal size={16} />
          </button>
          {onAdd && (
            <button
              className="p-0.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)]"
              style={{ color: COLORS.text.tertiary }}
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              title="Add a page"
            >
              <Plus size={16} />
            </button>
          )}
        </div>

        {/* Chevron */}
        <ChevronDown
          size={ICON.smallSize}
          className={`ml-0.5 flex-shrink-0 transition-transform duration-150 ${
            isOpen ? "" : "-rotate-90"
          }`}
          style={{ color: COLORS.text.tertiary }}
        />
      </div>

      {/* Nested pages with animation */}
      <div
        className="overflow-hidden transition-all duration-200 ease-in-out"
        style={{
          maxHeight: isOpen ? "2000px" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
