"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Search, FileText, Clock, ArrowRight } from "lucide-react";
import { useSidebar, Page } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

function flattenPages(pages: Page[]): Page[] {
  return pages.reduce<Page[]>((acc, page) => {
    acc.push(page);
    if (page.children.length > 0) {
      acc.push(...flattenPages(page.children));
    }
    return acc;
  }, []);
}

export function SearchDialog() {
  const { isSearchOpen, setSearchOpen, privatePages, teamspacePages, setActivePageId } =
    useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allPages = useMemo(
    () => [...flattenPages(privatePages), ...flattenPages(teamspacePages)],
    [privatePages, teamspacePages]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return allPages;
    const q = query.toLowerCase();
    return allPages.filter((p) => p.title.toLowerCase().includes(q));
  }, [query, allPages]);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filtered.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  const handleSelect = (page: Page) => {
    setActivePageId(page.id);
    setSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ backgroundColor: COLORS.bg.overlay }}
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-[600px] rounded-xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 h-[52px] border-b"
          style={{ borderColor: COLORS.border }}
        >
          <Search size={ICON.size} style={{ color: COLORS.text.tertiary }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages..."
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-[rgba(55,53,47,0.4)]"
            style={{ color: COLORS.text.primary }}
          />
          <kbd
            className="text-[11px] px-1.5 py-0.5 rounded border font-mono"
            style={{
              borderColor: COLORS.border,
              color: COLORS.text.tertiary,
              backgroundColor: "#f7f6f3",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <div
              className="px-4 py-8 text-center text-sm"
              style={{ color: COLORS.text.secondary }}
            >
              No results found
            </div>
          ) : (
            <>
              {!query.trim() && (
                <div
                  className="px-3 py-1.5 text-xs font-medium"
                  style={{ color: COLORS.text.secondary }}
                >
                  <Clock size={12} className="inline mr-1" />
                  Recent pages
                </div>
              )}
              {filtered.map((page, idx) => (
                <button
                  key={page.id}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left cursor-pointer transition-colors"
                  style={{
                    backgroundColor:
                      idx === selectedIndex ? COLORS.bg.hover : "transparent",
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => handleSelect(page)}
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-base">
                    {page.icon || (
                      <FileText size={16} style={{ color: COLORS.text.secondary }} />
                    )}
                  </span>
                  <span
                    className="flex-1 truncate text-sm"
                    style={{ color: COLORS.text.primary }}
                  >
                    {page.title}
                  </span>
                  {idx === selectedIndex && (
                    <ArrowRight
                      size={14}
                      style={{ color: COLORS.text.tertiary }}
                    />
                  )}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div
          className="flex items-center gap-4 px-4 py-2.5 text-[11px] border-t"
          style={{ borderColor: COLORS.border, color: COLORS.text.tertiary }}
        >
          <span>
            <kbd className="font-mono">↑↓</kbd> Navigate
          </span>
          <span>
            <kbd className="font-mono">↵</kbd> Open
          </span>
          <span>
            <kbd className="font-mono">⌘K</kbd> Toggle search
          </span>
        </div>
      </div>
    </div>
  );
}
