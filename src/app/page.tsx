"use client";

import { useMemo } from "react";
import {
  MessageSquare,
  Clock,
  Star,
  MoreHorizontal,
  Mail,
  CalendarDays,
  Monitor,
  Inbox,
  Send,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebar, Page } from "@/components/sidebar/SidebarContext";
import { COLORS } from "@/components/sidebar/constants";

/** Recursively find a page by ID */
function findPageById(pages: Page[], id: string): Page | null {
  for (const page of pages) {
    if (page.id === id) return page;
    if (page.children.length > 0) {
      const found = findPageById(page.children, id);
      if (found) return found;
    }
  }
  return null;
}

export default function Home() {
  const { activePageId, privatePages, teamspacePages } = useSidebar();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const activePage = useMemo(
    () => findPageById([...privatePages, ...teamspacePages], activePageId ?? ""),
    [activePageId, privatePages, teamspacePages]
  );

  const isHomePage = activePageId === "home" || activePageId === null;
  const isAppView = ["mail", "calendar", "desktop"].includes(activePageId ?? "");
  const isNavView = ["inbox", "meetings", "notion-ai"].includes(activePageId ?? "");
  const pageTitle = isHomePage
    ? "Home"
    : activePage?.title ?? activePageId ?? "Home";

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top bar */}
      <div
        className="flex items-center justify-between w-full px-4 h-[45px] flex-shrink-0"
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
      >
        <div className="flex items-center gap-2">
          {activePage && (
            <span className="text-base mr-0.5">{activePage.icon}</span>
          )}
          <span
            className="text-sm font-medium capitalize"
            style={{ color: COLORS.text.primary }}
          >
            {isAppView
              ? `Notion ${activePageId!.charAt(0).toUpperCase()}${activePageId!.slice(1)}`
              : pageTitle}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[Clock, Star, MessageSquare, MoreHorizontal].map((Icon, i) => (
            <button
              key={i}
              className="p-1.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.04)] transition-colors"
              style={{ color: COLORS.text.secondary }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col items-center w-full max-w-[900px] mx-auto px-24 py-20">
          {isHomePage && <HomeView greeting={greeting} />}
          {activePageId === "mail" && <MailView />}
          {activePageId === "calendar" && <CalendarView />}
          {activePageId === "desktop" && <DesktopView />}
          {activePageId === "inbox" && <InboxView />}
          {activePageId === "meetings" && <MeetingsView />}
          {activePageId === "notion-ai" && <NotionAIView />}
          {!isHomePage && !isAppView && !isNavView && activePage && (
            <PageView page={activePage} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Home View ──────────────────────────────────────────────────────── */
function HomeView({ greeting }: { greeting: string }) {
  return (
    <>
      <h1
        className="text-3xl font-bold mb-12"
        style={{ color: COLORS.text.primary }}
      >
        {greeting}
      </h1>
      <div className="w-full mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} style={{ color: COLORS.text.secondary }} />
          <span
            className="text-sm font-medium"
            style={{ color: COLORS.text.secondary }}
          >
            Recently visited
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <RecentCard icon="✅" title="Issue Tracking" avatar="L" avatarColor={COLORS.accent.red} date="Jun 6, 2025" />
          <RecentCard icon="📄" title="Getting Started" avatar="R" avatarColor={COLORS.accent.workspace} date="May 30, 2025" />
          <div
            className="rounded-lg border p-4 hover:bg-[rgba(55,53,47,0.02)] cursor-pointer transition-colors flex flex-col items-start justify-center"
            style={{ borderColor: COLORS.border }}
          >
            <div
              className="w-8 h-8 rounded border flex items-center justify-center mb-2 text-lg"
              style={{ borderColor: "rgba(55, 53, 47, 0.16)", color: COLORS.text.tertiary }}
            >
              +
            </div>
            <div className="text-sm font-medium" style={{ color: COLORS.text.secondary }}>
              New page
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RecentCard({ icon, title, avatar, avatarColor, date }: { icon: string; title: string; avatar: string; avatarColor: string; date: string }) {
  return (
    <div
      className="rounded-lg border p-4 hover:bg-[rgba(55,53,47,0.02)] cursor-pointer transition-colors"
      style={{ borderColor: COLORS.border }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-sm font-medium mb-1" style={{ color: COLORS.text.primary }}>
        {title}
      </div>
      <div className="text-xs flex items-center gap-1" style={{ color: "rgba(55, 53, 47, 0.5)" }}>
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] text-white font-semibold"
          style={{ backgroundColor: avatarColor }}
        >
          {avatar}
        </span>
        {date}
      </div>
    </div>
  );
}

/* ── Page View ──────────────────────────────────────────────────────── */
function PageView({ page }: { page: Page }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{page.icon}</span>
        <h1 className="text-4xl font-bold" style={{ color: COLORS.text.primary }}>
          {page.title}
        </h1>
      </div>
      <div className="text-base leading-relaxed" style={{ color: COLORS.text.secondary }}>
        <p className="mb-2">
          Press{" "}
          <kbd className="px-1.5 py-0.5 text-sm rounded border font-mono" style={{ borderColor: COLORS.border }}>
            /
          </kbd>{" "}
          for commands, or just start typing...
        </p>
      </div>
    </div>
  );
}

/* ── Mail View ──────────────────────────────────────────────────────── */
function MailView() {
  const mockEmails = [
    { id: 1, from: "Alex Kim", subject: "Design review tomorrow", preview: "Hey, just wanted to confirm our design review meeting...", time: "10:30 AM", unread: true },
    { id: 2, from: "Sarah Chen", subject: "Q1 Report Draft", preview: "Attached is the draft for the Q1 report. Please review...", time: "9:15 AM", unread: true },
    { id: 3, from: "Notion Team", subject: "Welcome to Notion Mail", preview: "Thanks for trying Notion Mail! Here's a quick guide...", time: "Yesterday", unread: false },
    { id: 4, from: "GitHub", subject: "[verita] Pull request #42 merged", preview: "Your pull request has been merged into main...", time: "Yesterday", unread: false },
    { id: 5, from: "Jordan Lee", subject: "Sprint planning notes", preview: "Here are the notes from today's sprint planning...", time: "Mon", unread: false },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Mail size={28} style={{ color: COLORS.text.primary }} />
          <h1 className="text-2xl font-bold" style={{ color: COLORS.text.primary }}>
            Notion Mail
          </h1>
        </div>
        <button
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg text-white font-medium"
          style={{ backgroundColor: COLORS.accent.blue }}
        >
          <Send size={14} />
          Compose
        </button>
      </div>

      {/* Mail tabs */}
      <div className="flex items-center gap-1 mb-4 border-b" style={{ borderColor: COLORS.border }}>
        {["Inbox", "Sent", "Drafts", "Archive"].map((tab, i) => (
          <button
            key={tab}
            className="px-3 py-2 text-sm font-medium border-b-2 transition-colors"
            style={{
              borderColor: i === 0 ? COLORS.accent.blue : "transparent",
              color: i === 0 ? COLORS.text.primary : COLORS.text.secondary,
            }}
          >
            {tab}
            {tab === "Inbox" && (
              <span
                className="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full text-white"
                style={{ backgroundColor: COLORS.accent.blue }}
              >
                2
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg border mb-4"
        style={{ borderColor: COLORS.border }}
      >
        <Search size={16} style={{ color: COLORS.text.tertiary }} />
        <span className="text-sm" style={{ color: COLORS.text.tertiary }}>
          Search mail...
        </span>
      </div>

      {/* Email list */}
      <div className="space-y-0">
        {mockEmails.map((email) => (
          <div
            key={email.id}
            className="flex items-start gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(55,53,47,0.04)]"
            style={{
              backgroundColor: email.unread ? "rgba(35, 131, 226, 0.04)" : "transparent",
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-0.5"
              style={{ backgroundColor: email.unread ? COLORS.accent.blue : COLORS.text.tertiary }}
            >
              {email.from[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className={`text-sm ${email.unread ? "font-semibold" : "font-medium"}`}
                  style={{ color: COLORS.text.primary }}
                >
                  {email.from}
                </span>
                <span className="text-xs flex-shrink-0 ml-2" style={{ color: COLORS.text.tertiary }}>
                  {email.time}
                </span>
              </div>
              <div
                className={`text-sm mb-0.5 ${email.unread ? "font-medium" : ""}`}
                style={{ color: COLORS.text.primary }}
              >
                {email.subject}
              </div>
              <div className="text-xs truncate" style={{ color: COLORS.text.secondary }}>
                {email.preview}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Calendar View ──────────────────────────────────────────────────── */
function CalendarView() {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const monthName = today.toLocaleString("default", { month: "long", year: "numeric" });

  const events = [
    { day: 7, title: "Design Review", color: COLORS.accent.blue },
    { day: 10, title: "Sprint Planning", color: COLORS.accent.teamspace },
    { day: 14, title: "1:1 with Manager", color: COLORS.accent.workspace },
    { day: 21, title: "Team Standup", color: COLORS.accent.blue },
    { day: today.getDate(), title: "Today", color: COLORS.accent.red },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarDays size={28} style={{ color: COLORS.text.primary }} />
          <h1 className="text-2xl font-bold" style={{ color: COLORS.text.primary }}>
            Notion Calendar
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.04)]">
            <ChevronLeft size={18} style={{ color: COLORS.text.secondary }} />
          </button>
          <span className="text-sm font-medium px-2" style={{ color: COLORS.text.primary }}>
            {monthName}
          </span>
          <button className="p-1.5 rounded-[4px] hover:bg-[rgba(55,53,47,0.04)]">
            <ChevronRight size={18} style={{ color: COLORS.text.secondary }} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0 border rounded-lg overflow-hidden" style={{ borderColor: COLORS.border }}>
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium py-2 border-b"
            style={{ borderColor: COLORS.border, color: COLORS.text.secondary, backgroundColor: "#fafafa" }}
          >
            {day}
          </div>
        ))}
        {/* Empty cells before first day */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-20 border-b border-r" style={{ borderColor: COLORS.border, backgroundColor: "#fafafa" }} />
        ))}
        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate();
          const dayEvents = events.filter((e) => e.day === day && e.title !== "Today");
          return (
            <div
              key={day}
              className="h-20 border-b border-r p-1 hover:bg-[rgba(55,53,47,0.02)] cursor-pointer transition-colors"
              style={{ borderColor: COLORS.border }}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                  isToday ? "text-white font-semibold" : ""
                }`}
                style={{
                  backgroundColor: isToday ? COLORS.accent.blue : "transparent",
                  color: isToday ? "white" : COLORS.text.primary,
                }}
              >
                {day}
              </span>
              {dayEvents.map((event, ei) => (
                <div
                  key={ei}
                  className="text-[10px] mt-0.5 px-1 py-0.5 rounded truncate text-white font-medium"
                  style={{ backgroundColor: event.color }}
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Desktop View ───────────────────────────────────────────────────── */
function DesktopView() {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <Monitor size={64} strokeWidth={1.2} style={{ color: COLORS.text.tertiary }} className="mb-6" />
      <h1 className="text-2xl font-bold mb-3" style={{ color: COLORS.text.primary }}>
        Notion Desktop
      </h1>
      <p className="text-sm mb-6 max-w-md" style={{ color: COLORS.text.secondary }}>
        Get the full Notion experience with the desktop app. Native notifications, offline access, and a distraction-free environment.
      </p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-8">
        {[
          { icon: "🖥️", title: "Native Performance", desc: "Faster load times and smooth scrolling" },
          { icon: "🔔", title: "Notifications", desc: "System-level push notifications" },
          { icon: "📴", title: "Offline Access", desc: "Work without internet connection" },
        ].map((feature) => (
          <div key={feature.title} className="rounded-lg border p-4" style={{ borderColor: COLORS.border }}>
            <span className="text-2xl block mb-2">{feature.icon}</span>
            <div className="text-xs font-medium mb-1" style={{ color: COLORS.text.primary }}>
              {feature.title}
            </div>
            <div className="text-[11px]" style={{ color: COLORS.text.secondary }}>
              {feature.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="text-sm px-6 py-2.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: COLORS.accent.blue }}
        >
          Download for Mac
        </button>
        <button
          className="text-sm px-6 py-2.5 rounded-lg font-medium border transition-colors hover:bg-[rgba(55,53,47,0.04)]"
          style={{ borderColor: COLORS.border, color: COLORS.text.primary }}
        >
          Download for Windows
        </button>
      </div>
    </div>
  );
}

/* ── Inbox View ─────────────────────────────────────────────────────── */
function InboxView() {
  const notifications = [
    { id: 1, text: "Alex Kim mentioned you in Design Review", time: "2 hours ago", icon: "💬", read: false },
    { id: 2, text: "Issue Tracking was updated", time: "5 hours ago", icon: "✅", read: false },
    { id: 3, text: "You were added to Sprint Planning", time: "Yesterday", icon: "📋", read: true },
    { id: 4, text: "Sarah commented on Bug Reports", time: "Yesterday", icon: "🐛", read: true },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Inbox size={28} style={{ color: COLORS.text.primary }} />
        <h1 className="text-2xl font-bold" style={{ color: COLORS.text.primary }}>
          Inbox
        </h1>
        <span
          className="text-xs px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: COLORS.accent.blue }}
        >
          {notifications.filter((n) => !n.read).length} new
        </span>
      </div>

      <div className="space-y-1">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-start gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors hover:bg-[rgba(55,53,47,0.04)]"
            style={{
              backgroundColor: notif.read ? "transparent" : "rgba(35, 131, 226, 0.04)",
            }}
          >
            <span className="text-lg flex-shrink-0 mt-0.5">{notif.icon}</span>
            <div className="flex-1">
              <div
                className={`text-sm ${notif.read ? "" : "font-medium"}`}
                style={{ color: COLORS.text.primary }}
              >
                {notif.text}
              </div>
              <div className="text-xs mt-0.5" style={{ color: COLORS.text.tertiary }}>
                {notif.time}
              </div>
            </div>
            {!notif.read && (
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                style={{ backgroundColor: COLORS.accent.blue }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Meetings View ──────────────────────────────────────────────────── */
function MeetingsView() {
  const meetings = [
    { id: 1, title: "Daily Standup", time: "9:00 AM - 9:15 AM", attendees: 5, status: "upcoming" },
    { id: 2, title: "Design Review", time: "11:00 AM - 12:00 PM", attendees: 3, status: "upcoming" },
    { id: 3, title: "1:1 with Manager", time: "2:00 PM - 2:30 PM", attendees: 2, status: "upcoming" },
    { id: 4, title: "Sprint Retrospective", time: "4:00 PM - 5:00 PM", attendees: 8, status: "upcoming" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays size={28} style={{ color: COLORS.text.primary }} />
        <h1 className="text-2xl font-bold" style={{ color: COLORS.text.primary }}>
          Meetings
        </h1>
      </div>

      <div className="mb-2 text-xs font-medium" style={{ color: COLORS.text.secondary }}>
        Today — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
      </div>

      <div className="space-y-2">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors hover:bg-[rgba(55,53,47,0.02)]"
            style={{ borderColor: COLORS.border }}
          >
            <div
              className="w-1 h-12 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS.accent.blue }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium" style={{ color: COLORS.text.primary }}>
                {meeting.title}
              </div>
              <div className="text-xs mt-0.5" style={{ color: COLORS.text.secondary }}>
                {meeting.time}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {Array.from({ length: Math.min(meeting.attendees, 3) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-semibold"
                    style={{ backgroundColor: [COLORS.accent.blue, COLORS.accent.teamspace, COLORS.accent.workspace][i % 3] }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              {meeting.attendees > 3 && (
                <span className="text-[11px]" style={{ color: COLORS.text.tertiary }}>
                  +{meeting.attendees - 3}
                </span>
              )}
            </div>
            <button
              className="text-xs px-3 py-1.5 rounded font-medium text-white"
              style={{ backgroundColor: COLORS.accent.blue }}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Notion AI View ─────────────────────────────────────────────────── */
function NotionAIView() {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="text-5xl mb-4">✨</div>
      <h1 className="text-2xl font-bold mb-3" style={{ color: COLORS.text.primary }}>
        Notion AI
      </h1>
      <p className="text-sm mb-8 max-w-md" style={{ color: COLORS.text.secondary }}>
        Your AI-powered assistant that helps you write, brainstorm, and organize your thoughts.
      </p>

      <div
        className="w-full max-w-lg rounded-xl border p-6"
        style={{ borderColor: COLORS.border }}
      >
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg border mb-4"
          style={{ borderColor: COLORS.border }}
        >
          <span className="text-lg">✨</span>
          <span className="text-sm" style={{ color: COLORS.text.tertiary }}>
            Ask AI anything...
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            "📝 Help me write...",
            "💡 Brainstorm ideas",
            "📊 Summarize this page",
            "🔄 Translate to...",
            "✍️ Improve writing",
            "📋 Create action items",
          ].map((suggestion) => (
            <button
              key={suggestion}
              className="text-left text-xs px-3 py-2 rounded-lg border transition-colors hover:bg-[rgba(55,53,47,0.04)]"
              style={{ borderColor: COLORS.border, color: COLORS.text.secondary }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
