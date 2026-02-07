"use client";

import { Mail, CalendarDays, Monitor } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useSidebar } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

const apps = [
  { id: "mail", label: "Notion Mail", icon: Mail },
  { id: "calendar", label: "Notion Calendar", icon: CalendarDays },
  { id: "desktop", label: "Notion Desktop", icon: Monitor },
] as const;

export function SidebarApps() {
  const { activePageId, setActivePageId } = useSidebar();

  return (
    <div className="px-1 py-0.5">
      <div
        className="px-2 py-1 text-xs font-medium select-none"
        style={{ color: COLORS.text.secondary }}
      >
        Notion apps
      </div>
      {apps.map((app) => (
        <SidebarItem
          key={app.id}
          icon={
            <app.icon
              size={ICON.size}
              strokeWidth={ICON.strokeWidth}
              style={{ color: COLORS.text.secondary }}
            />
          }
          label={app.label}
          isActive={activePageId === app.id}
          onClick={() => setActivePageId(app.id)}
        />
      ))}
    </div>
  );
}
