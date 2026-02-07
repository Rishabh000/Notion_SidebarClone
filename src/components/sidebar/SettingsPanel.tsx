"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  User,
  CreditCard,
  Users,
  Link2,
  Shield,
  Bell,
  Globe,
  Palette,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { COLORS, ICON } from "./constants";

const settingsTabs = [
  { id: "account", label: "My account", icon: User },
  { id: "notifications", label: "My notifications", icon: Bell },
  { id: "connections", label: "My connections", icon: Link2 },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language & region", icon: Globe },
  { id: "teamspace", label: "Teamspace settings", icon: Users },
  { id: "members", label: "Members", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
] as const;

export function SettingsPanel() {
  const { isSettingsOpen, setSettingsOpen } = useSidebar();
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    if (!isSettingsOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSettingsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isSettingsOpen, setSettingsOpen]);

  if (!isSettingsOpen) return null;

  const activeTabData = settingsTabs.find((t) => t.id === activeTab);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: COLORS.bg.overlay }}
      onClick={() => setSettingsOpen(false)}
    >
      <div
        ref={panelRef}
        className="w-full max-w-[880px] h-[85vh] rounded-xl shadow-2xl overflow-hidden flex"
        style={{ backgroundColor: "white" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Settings sidebar */}
        <div
          className="w-[240px] flex-shrink-0 border-r overflow-y-auto py-3"
          style={{ borderColor: COLORS.border, backgroundColor: "#fbfbfa" }}
        >
          <div
            className="px-4 py-2 text-xs font-medium uppercase tracking-wide"
            style={{ color: COLORS.text.secondary }}
          >
            Settings
          </div>
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              className="w-full flex items-center gap-2.5 px-4 py-1.5 text-left transition-colors rounded-none"
              style={{
                backgroundColor:
                  activeTab === tab.id ? COLORS.bg.active : "transparent",
                color:
                  activeTab === tab.id
                    ? COLORS.text.primary
                    : COLORS.text.secondary,
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = COLORS.bg.hover;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={ICON.size} strokeWidth={ICON.strokeWidth} />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div
            className="flex items-center justify-between px-8 py-5 border-b sticky top-0 bg-white z-10"
            style={{ borderColor: COLORS.border }}
          >
            <h2
              className="text-lg font-semibold"
              style={{ color: COLORS.text.primary }}
            >
              {activeTabData?.label}
            </h2>
            <button
              className="p-1.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.04)] transition-colors"
              onClick={() => setSettingsOpen(false)}
            >
              <X size={18} style={{ color: COLORS.text.tertiary }} />
            </button>
          </div>

          {/* Content area */}
          <div className="px-8 py-6">
            {activeTab === "account" && (
              <div>
                {/* Profile section */}
                <div className="mb-8">
                  <h3
                    className="text-sm font-medium mb-4"
                    style={{ color: COLORS.text.primary }}
                  >
                    My profile
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold"
                      style={{ backgroundColor: COLORS.accent.workspace }}
                    >
                      R
                    </div>
                    <div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: COLORS.text.primary }}
                      >
                        Rishabh Ranka
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: COLORS.text.secondary }}
                      >
                        rishabh@example.com
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account details */}
                <div className="space-y-4">
                  {[
                    { label: "Preferred name", value: "Rishabh Ranka" },
                    { label: "Email", value: "rishabh@example.com" },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="flex items-center justify-between py-2 border-b"
                      style={{ borderColor: COLORS.border }}
                    >
                      <div>
                        <div
                          className="text-sm"
                          style={{ color: COLORS.text.secondary }}
                        >
                          {field.label}
                        </div>
                        <div
                          className="text-sm mt-0.5"
                          style={{ color: COLORS.text.primary }}
                        >
                          {field.value}
                        </div>
                      </div>
                      <button
                        className="text-xs px-3 py-1.5 rounded border hover:bg-[rgba(55,53,47,0.04)] transition-colors"
                        style={{
                          borderColor: COLORS.border,
                          color: COLORS.text.primary,
                        }}
                      >
                        Change
                      </button>
                    </div>
                  ))}
                </div>

                {/* Danger zone */}
                <div className="mt-10">
                  <h3
                    className="text-sm font-medium mb-4"
                    style={{ color: COLORS.accent.red }}
                  >
                    Danger zone
                  </h3>
                  <button
                    className="text-sm px-4 py-2 rounded border transition-colors hover:bg-red-50"
                    style={{
                      borderColor: COLORS.accent.red,
                      color: COLORS.accent.red,
                    }}
                  >
                    Delete my account
                  </button>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div>
                <h3
                  className="text-sm font-medium mb-4"
                  style={{ color: COLORS.text.primary }}
                >
                  Appearance
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {["Light", "Dark", "System"].map((theme) => (
                    <button
                      key={theme}
                      className="rounded-lg border p-4 text-center transition-colors hover:bg-[rgba(55,53,47,0.04)]"
                      style={{
                        borderColor:
                          theme === "Light"
                            ? COLORS.accent.blue
                            : COLORS.border,
                        color: COLORS.text.primary,
                      }}
                    >
                      <div
                        className={`w-full h-16 rounded mb-2 ${
                          theme === "Dark" ? "bg-zinc-800" : "bg-zinc-100"
                        }`}
                        style={
                          theme === "System"
                            ? {
                                background:
                                  "linear-gradient(135deg, #f5f5f4 50%, #27272a 50%)",
                              }
                            : undefined
                        }
                      />
                      <span className="text-sm">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h3
                  className="text-sm font-medium mb-4"
                  style={{ color: COLORS.text.primary }}
                >
                  Notification preferences
                </h3>
                {[
                  {
                    label: "Mobile push notifications",
                    desc: "Receive push notifications on your mobile devices",
                    enabled: true,
                  },
                  {
                    label: "Email notifications",
                    desc: "Receive email updates about activity",
                    enabled: false,
                  },
                  {
                    label: "Slack notifications",
                    desc: "Get notified through Slack integration",
                    enabled: false,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: COLORS.border }}
                  >
                    <div>
                      <div
                        className="text-sm"
                        style={{ color: COLORS.text.primary }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: COLORS.text.secondary }}
                      >
                        {item.desc}
                      </div>
                    </div>
                    <ToggleSwitch defaultChecked={item.enabled} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "members" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-sm font-medium"
                    style={{ color: COLORS.text.primary }}
                  >
                    Members
                  </h3>
                  <button
                    className="text-sm px-3 py-1.5 rounded text-white transition-colors"
                    style={{ backgroundColor: COLORS.accent.blue }}
                  >
                    Add members
                  </button>
                </div>
                <div
                  className="flex items-center gap-3 py-3 border-b"
                  style={{ borderColor: COLORS.border }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                    style={{ backgroundColor: COLORS.accent.workspace }}
                  >
                    R
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-sm"
                      style={{ color: COLORS.text.primary }}
                    >
                      Rishabh Ranka
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: COLORS.text.secondary }}
                    >
                      rishabh@example.com
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: "rgba(55, 53, 47, 0.06)",
                      color: COLORS.text.secondary,
                    }}
                  >
                    Owner
                  </span>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div>
                <h3
                  className="text-sm font-medium mb-4"
                  style={{ color: COLORS.text.primary }}
                >
                  Current plan
                </h3>
                <div
                  className="rounded-lg border p-5 mb-6"
                  style={{ borderColor: COLORS.border }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className="text-base font-semibold"
                        style={{ color: COLORS.text.primary }}
                      >
                        Free Plan
                      </div>
                      <div
                        className="text-sm mt-1"
                        style={{ color: COLORS.text.secondary }}
                      >
                        For organizing every corner of your work & life.
                      </div>
                    </div>
                    <button
                      className="text-sm px-4 py-2 rounded text-white font-medium transition-colors hover:opacity-90"
                      style={{ backgroundColor: COLORS.accent.blue }}
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Generic content for tabs without specific content */}
            {!["account", "appearance", "notifications", "members", "billing"].includes(
              activeTab
            ) && (
              <div
                className="text-sm py-8 text-center"
                style={{ color: COLORS.text.secondary }}
              >
                {activeTabData?.label} settings will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Simple toggle switch component */
function ToggleSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <button
      className="relative w-[36px] h-[20px] rounded-full transition-colors duration-200 flex-shrink-0"
      style={{
        backgroundColor: checked ? COLORS.accent.blue : "rgba(55, 53, 47, 0.2)",
      }}
      onClick={() => setChecked(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <div
        className="absolute top-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{
          transform: checked ? "translateX(18px)" : "translateX(2px)",
        }}
      />
    </button>
  );
}
