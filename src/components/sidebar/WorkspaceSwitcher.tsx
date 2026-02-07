"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  PenLine,
  Settings,
  Users,
  LogOut,
} from "lucide-react";
import { COLORS, ICON } from "./constants";

const WORKSPACE_NAME = "Rishabh Ranka's Workspace";
const WORKSPACE_INITIAL = "R";
const WORKSPACE_PLAN = "Free Plan";

export function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between px-3 py-2 group cursor-pointer hover:bg-[rgba(55,53,47,0.04)] transition-colors"
        style={{ minHeight: "44px" }}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Workspace avatar */}
          <div
            className="flex-shrink-0 w-[22px] h-[22px] rounded-[4px] flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: COLORS.accent.workspace }}
          >
            {WORKSPACE_INITIAL}
          </div>
          {/* Workspace name + chevron */}
          <div className="flex items-center gap-1 min-w-0">
            <span
              className="text-sm font-medium truncate"
              style={{ color: COLORS.text.primary }}
            >
              {WORKSPACE_NAME}
            </span>
            <ChevronDown
              size={ICON.smallSize}
              className={`flex-shrink-0 transition-transform duration-150 ${
                isOpen ? "rotate-180" : ""
              }`}
              style={{ color: COLORS.text.tertiary }}
            />
          </div>
        </div>
        {/* Quick edit button */}
        <button
          className="flex-shrink-0 p-1 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity duration-100 hover:bg-[rgba(55,53,47,0.08)]"
          style={{ color: COLORS.text.tertiary }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          title="Edit"
        >
          <PenLine size={16} />
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-full left-1 right-1 mt-0.5 rounded-lg shadow-xl border z-40 overflow-hidden"
          style={{
            backgroundColor: "white",
            borderColor: COLORS.border,
          }}
        >
          {/* Workspace info */}
          <div
            className="px-3 py-3 border-b"
            style={{ borderColor: COLORS.border }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center text-white text-sm font-semibold"
                style={{ backgroundColor: COLORS.accent.workspace }}
              >
                {WORKSPACE_INITIAL}
              </div>
              <div>
                <div
                  className="text-sm font-medium leading-tight"
                  style={{ color: COLORS.text.primary }}
                >
                  {WORKSPACE_NAME}
                </div>
                <div
                  className="text-xs leading-tight mt-0.5"
                  style={{ color: COLORS.text.secondary }}
                >
                  {WORKSPACE_PLAN} · 1 member
                </div>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-1">
            {[
              { icon: Settings, label: "Settings" },
              { icon: Users, label: "Invite members" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left hover:bg-[rgba(55,53,47,0.04)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon
                  size={ICON.size}
                  strokeWidth={ICON.strokeWidth}
                  style={{ color: COLORS.text.secondary }}
                />
                <span
                  className="text-sm"
                  style={{ color: COLORS.text.primary }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="py-1 border-t" style={{ borderColor: COLORS.border }}>
            <button
              className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left hover:bg-[rgba(55,53,47,0.04)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LogOut
                size={ICON.size}
                strokeWidth={ICON.strokeWidth}
                style={{ color: COLORS.text.secondary }}
              />
              <span
                className="text-sm"
                style={{ color: COLORS.text.primary }}
              >
                Log out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
