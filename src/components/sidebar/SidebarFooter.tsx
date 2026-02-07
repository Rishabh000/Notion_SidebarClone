"use client";

import { Settings, Store, Trash2 } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useSidebar } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

export function SidebarFooter() {
  const { setTrashOpen, setSettingsOpen, setMarketplaceOpen, trashedPages } =
    useSidebar();

  return (
    <div
      className="px-1 py-1.5 border-t"
      style={{ borderColor: COLORS.border }}
    >
      <SidebarItem
        icon={
          <Settings
            size={ICON.size}
            strokeWidth={ICON.strokeWidth}
            style={{ color: COLORS.text.secondary }}
          />
        }
        label="Settings"
        onClick={() => setSettingsOpen(true)}
      />
      <SidebarItem
        icon={
          <Store
            size={ICON.size}
            strokeWidth={ICON.strokeWidth}
            style={{ color: COLORS.text.secondary }}
          />
        }
        label="Marketplace"
        onClick={() => setMarketplaceOpen(true)}
      />
      <SidebarItem
        icon={
          <Trash2
            size={ICON.size}
            strokeWidth={ICON.strokeWidth}
            style={{ color: COLORS.text.secondary }}
          />
        }
        label="Trash"
        onClick={() => setTrashOpen(true)}
        rightActions={
          trashedPages.length > 0 ? (
            <span
              className="text-[11px] px-1 rounded-full"
              style={{
                backgroundColor: "rgba(235, 87, 87, 0.1)",
                color: COLORS.accent.red,
              }}
            >
              {trashedPages.length}
            </span>
          ) : undefined
        }
      />
    </div>
  );
}
