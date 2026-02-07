"use client";

import { useEffect, useRef, useState } from "react";
import { X, Search, ExternalLink } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

const integrations = [
  {
    id: "slack",
    name: "Slack",
    desc: "Send Notion updates to Slack channels",
    icon: "💬",
    category: "Communication",
    installed: true,
  },
  {
    id: "github",
    name: "GitHub",
    desc: "Link pull requests and issues to Notion pages",
    icon: "🐙",
    category: "Development",
    installed: false,
  },
  {
    id: "figma",
    name: "Figma",
    desc: "Embed and preview Figma files in Notion",
    icon: "🎨",
    category: "Design",
    installed: true,
  },
  {
    id: "google-drive",
    name: "Google Drive",
    desc: "Embed Google Docs, Sheets, and Slides",
    icon: "📁",
    category: "Productivity",
    installed: false,
  },
  {
    id: "jira",
    name: "Jira",
    desc: "Sync Jira issues with Notion databases",
    icon: "🔷",
    category: "Development",
    installed: false,
  },
  {
    id: "zapier",
    name: "Zapier",
    desc: "Connect Notion to 5000+ apps",
    icon: "⚡",
    category: "Automation",
    installed: false,
  },
  {
    id: "trello",
    name: "Trello",
    desc: "Import boards and cards into Notion",
    icon: "📋",
    category: "Productivity",
    installed: false,
  },
  {
    id: "loom",
    name: "Loom",
    desc: "Embed Loom videos directly in pages",
    icon: "🎥",
    category: "Communication",
    installed: true,
  },
];

export function MarketplacePanel() {
  const { isMarketplaceOpen, setMarketplaceOpen } = useSidebar();
  const panelRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [installedStates, setInstalledStates] = useState<Record<string, boolean>>(
    () => Object.fromEntries(integrations.map((i) => [i.id, i.installed]))
  );

  useEffect(() => {
    if (!isMarketplaceOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMarketplaceOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMarketplaceOpen, setMarketplaceOpen]);

  if (!isMarketplaceOpen) return null;

  const filtered = query.trim()
    ? integrations.filter(
        (i) =>
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.category.toLowerCase().includes(query.toLowerCase())
      )
    : integrations;

  const toggleInstall = (id: string) => {
    setInstalledStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: COLORS.bg.overlay }}
      onClick={() => setMarketplaceOpen(false)}
    >
      <div
        ref={panelRef}
        className="w-full max-w-[700px] h-[80vh] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ borderColor: COLORS.border }}
        >
          <div>
            <h2
              className="text-lg font-semibold"
              style={{ color: COLORS.text.primary }}
            >
              Marketplace
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: COLORS.text.secondary }}
            >
              Discover integrations and templates
            </p>
          </div>
          <button
            className="p-1.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.04)] transition-colors"
            onClick={() => setMarketplaceOpen(false)}
          >
            <X size={ICON.size} style={{ color: COLORS.text.tertiary }} />
          </button>
        </div>

        {/* Search */}
        <div
          className="px-6 py-3 border-b flex-shrink-0"
          style={{ borderColor: COLORS.border }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border"
            style={{ borderColor: COLORS.border }}
          >
            <Search size={16} style={{ color: COLORS.text.tertiary }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search integrations..."
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: COLORS.text.primary }}
            />
          </div>
        </div>

        {/* Integrations list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filtered.length === 0 ? (
            <div
              className="text-center py-12 text-sm"
              style={{ color: COLORS.text.secondary }}
            >
              No integrations found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filtered.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center gap-4 p-4 rounded-lg border transition-colors hover:bg-[rgba(55,53,47,0.02)]"
                  style={{ borderColor: COLORS.border }}
                >
                  <span className="text-3xl flex-shrink-0">
                    {integration.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: COLORS.text.primary }}
                      >
                        {integration.name}
                      </span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: "rgba(55, 53, 47, 0.06)",
                          color: COLORS.text.secondary,
                        }}
                      >
                        {integration.category}
                      </span>
                    </div>
                    <p
                      className="text-xs mt-0.5 truncate"
                      style={{ color: COLORS.text.secondary }}
                    >
                      {integration.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      className="p-1.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.04)]"
                      title="View details"
                    >
                      <ExternalLink
                        size={14}
                        style={{ color: COLORS.text.tertiary }}
                      />
                    </button>
                    <button
                      className="text-xs px-3 py-1.5 rounded font-medium transition-colors"
                      style={
                        installedStates[integration.id]
                          ? {
                              border: `1px solid ${COLORS.border}`,
                              color: COLORS.text.secondary,
                              backgroundColor: "white",
                            }
                          : {
                              backgroundColor: COLORS.accent.blue,
                              color: "white",
                            }
                      }
                      onClick={() => toggleInstall(integration.id)}
                    >
                      {installedStates[integration.id] ? "Installed" : "Install"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
