"use client";

import { Search, Home, Calendar, Sparkles, Inbox } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useSidebar } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

const navItems = [
  { id: "search", label: "Search", icon: Search, shortcut: "⌘K" },
  { id: "home", label: "Home", icon: Home },
  { id: "meetings", label: "Meetings", icon: Calendar },
  { id: "notion-ai", label: "Notion AI", icon: Sparkles },
  { id: "inbox", label: "Inbox", icon: Inbox },
];

export function SidebarNav() {
  const { activePageId, setActivePageId, setSearchOpen } = useSidebar();

  return (
    <div className="px-1 py-0.5">
      {navItems.map((item) => (
        <SidebarItem
          key={item.id}
          icon={
            <item.icon
              size={ICON.size}
              strokeWidth={ICON.strokeWidth}
              style={{ color: COLORS.text.secondary }}
            />
          }
          label={item.label}
          isActive={activePageId === item.id}
          onClick={() => {
            if (item.id === "search") {
              setSearchOpen(true);
            } else {
              setActivePageId(item.id);
            }
          }}
          rightActions={
            item.shortcut ? (
              <kbd
                className="text-[11px] px-1 py-0 rounded font-mono"
                style={{ color: COLORS.text.tertiary }}
              >
                {item.shortcut}
              </kbd>
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
