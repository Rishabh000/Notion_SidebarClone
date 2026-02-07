"use client";

import { useState, useCallback, ReactNode } from "react";
import { ChevronRight, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useSidebar, Page } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

interface PageItemProps {
  page: Page;
  indent?: number;
}

export function PageItem({ page, indent = 0 }: PageItemProps) {
  const { activePageId, setActivePageId, addSubPage, deletePage } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const hasChildren = page.children.length > 0;
  const isActive = activePageId === page.id;

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    },
    []
  );

  const handleSelect = useCallback(() => {
    setActivePageId(page.id);
  }, [page.id, setActivePageId]);

  const handleAddSubPage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addSubPage(page.id);
      setIsOpen(true);
    },
    [page.id, addSubPage]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      deletePage(page.id);
      setShowMenu(false);
    },
    [page.id, deletePage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect();
      } else if (e.key === "ArrowRight" && hasChildren && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "ArrowLeft" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    },
    [handleSelect, hasChildren, isOpen]
  );

  return (
    <div>
      <div
        className="sidebar-item group flex items-center rounded-[4px] cursor-pointer select-none transition-colors duration-75 relative"
        style={{
          padding: `3px 8px 3px ${8 + indent * 24}px`,
          backgroundColor: isActive ? COLORS.bg.active : undefined,
          minHeight: "28px",
        }}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        role="treeitem"
        tabIndex={0}
        aria-expanded={hasChildren ? isOpen : undefined}
        aria-selected={isActive}
        title={page.title}
      >
        {/* Toggle arrow */}
        <button
          className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center rounded-[4px] mr-0 transition-colors hover:bg-[rgba(55,53,47,0.08)]"
          onClick={handleToggle}
          style={{ color: COLORS.text.tertiary }}
          tabIndex={-1}
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <ChevronRight
            size={ICON.tinySize}
            className={`transition-transform duration-150 ${
              isOpen ? "rotate-90 opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />
        </button>

        {/* Page icon */}
        <span className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center text-sm mr-1.5">
          {page.icon}
        </span>

        {/* Page title */}
        <span
          className="flex-1 truncate text-sm leading-[1.2]"
          style={{ color: COLORS.text.primary }}
        >
          {page.title}
        </span>

        {/* Hover actions */}
        <div className="flex items-center gap-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          <button
            className="p-0.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)] relative"
            style={{ color: COLORS.text.tertiary }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            title="More actions"
          >
            <MoreHorizontal size={16} />
          </button>
          <button
            className="p-0.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.08)]"
            style={{ color: COLORS.text.tertiary }}
            onClick={handleAddSubPage}
            title="Add a page inside"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Context menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
            />
            <div
              className="absolute right-0 top-full mt-0.5 w-[200px] rounded-lg shadow-xl border z-50 py-1 overflow-hidden"
              style={{
                backgroundColor: "white",
                borderColor: COLORS.border,
              }}
            >
              <button
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left hover:bg-[rgba(55,53,47,0.04)] transition-colors"
                onClick={handleDelete}
              >
                <Trash2 size={ICON.smallSize} style={{ color: COLORS.accent.red }} />
                <span className="text-sm" style={{ color: COLORS.accent.red }}>
                  Move to trash
                </span>
              </button>
              <button
                className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left hover:bg-[rgba(55,53,47,0.04)] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  addSubPage(page.id);
                  setIsOpen(true);
                  setShowMenu(false);
                }}
              >
                <Plus size={ICON.smallSize} style={{ color: COLORS.text.secondary }} />
                <span
                  className="text-sm"
                  style={{ color: COLORS.text.primary }}
                >
                  Add sub-page
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Nested children or empty state */}
      {isOpen && (
        <div role="group">
          {hasChildren ? (
            page.children.map((child) => (
              <PageItem
                key={child.id}
                page={child}
                indent={indent + 1}
              />
            ))
          ) : (
            <div
              className="text-xs py-1 truncate"
              style={{
                paddingLeft: `${32 + indent * 24}px`,
                color: COLORS.text.tertiary,
              }}
            >
              No pages inside
            </div>
          )}
        </div>
      )}
    </div>
  );
}
