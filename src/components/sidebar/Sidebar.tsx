"use client";

import { useState, useCallback } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { SidebarNav } from "./SidebarNav";
import { SidebarSection } from "./SidebarSection";
import { PageItem } from "./PageItem";
import { TeamspaceItem } from "./TeamspaceItem";
import { SidebarApps } from "./SidebarApps";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarItem } from "./SidebarItem";
import { SearchDialog } from "./SearchDialog";
import { TrashPanel } from "./TrashPanel";
import { SettingsPanel } from "./SettingsPanel";
import { MarketplacePanel } from "./MarketplacePanel";
import { useSidebar } from "./SidebarContext";
import { SIDEBAR, COLORS, ICON } from "./constants";

export function Sidebar() {
  const {
    privatePages,
    teamspacePages,
    addPrivatePage,
    addTeamspacePage,
  } = useSidebar();

  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR.DEFAULT_WIDTH);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);

      const startX = e.clientX;
      const startWidth = sidebarWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newWidth = Math.max(
          SIDEBAR.MIN_WIDTH,
          Math.min(SIDEBAR.MAX_WIDTH, startWidth + (moveEvent.clientX - startX))
        );
        setSidebarWidth(newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [sidebarWidth]
  );

  return (
    <>
      <aside
        className="relative flex flex-col h-screen flex-shrink-0"
        style={{
          width: `${sidebarWidth}px`,
          backgroundColor: COLORS.bg.sidebar,
        }}
        role="navigation"
        aria-label="Sidebar"
      >
        {/* Workspace switcher - fixed top */}
        <WorkspaceSwitcher />

        {/* Scrollable middle area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll" role="tree">
          {/* Quick nav */}
          <SidebarNav />

          {/* Private section */}
          <SidebarSection
            title="Private"
            defaultOpen
            onAdd={() => addPrivatePage()}
          >
            {privatePages.map((page) => (
              <PageItem key={page.id} page={page} />
            ))}
            <SidebarItem
              icon={
                <Plus
                  size={16}
                  strokeWidth={ICON.strokeWidth}
                  style={{ color: COLORS.text.tertiary }}
                />
              }
              label="Add new"
              secondaryLabel
              onClick={() => addPrivatePage()}
            />
          </SidebarSection>

          {/* Teamspaces section */}
          <SidebarSection
            title="Teamspaces"
            defaultOpen
            onAdd={() => addTeamspacePage()}
          >
            <TeamspaceItem
              name="Rishabh Ranka's Workspace"
              icon="R"
              defaultOpen
              onAdd={() => addTeamspacePage()}
            >
              {teamspacePages.map((page) => (
                <PageItem key={page.id} page={page} indent={1} />
              ))}
            </TeamspaceItem>

            <SidebarItem
              icon={
                <Plus
                  size={16}
                  strokeWidth={ICON.strokeWidth}
                  style={{ color: COLORS.text.tertiary }}
                />
              }
              label="Add new"
              secondaryLabel
              onClick={() => addTeamspacePage()}
            />
            <SidebarItem
              icon={
                <MoreHorizontal
                  size={16}
                  strokeWidth={ICON.strokeWidth}
                  style={{ color: COLORS.text.tertiary }}
                />
              }
              label="More"
              secondaryLabel
            />
          </SidebarSection>
        </div>

        {/* Notion apps - above footer */}
        <div className="border-t" style={{ borderColor: COLORS.border }}>
          <SidebarApps />
        </div>

        {/* Footer - settings, marketplace, trash */}
        <SidebarFooter />

        {/* Trash panel (popover inside sidebar) */}
        <TrashPanel />

        {/* Resize handle */}
        <div
          className="absolute top-0 right-0 w-[3px] h-full cursor-col-resize z-10"
          onMouseDown={handleMouseDown}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
        >
          <div
            className={`w-full h-full transition-colors duration-150 ${
              isResizing
                ? "bg-blue-500"
                : "bg-transparent hover:bg-[rgba(55,53,47,0.12)]"
            }`}
          />
        </div>
      </aside>

      {/* Overlay panels (rendered outside sidebar for proper z-indexing) */}
      <SearchDialog />
      <SettingsPanel />
      <MarketplacePanel />
    </>
  );
}
