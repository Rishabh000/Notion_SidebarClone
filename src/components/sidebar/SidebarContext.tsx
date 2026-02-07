"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface Page {
  id: string;
  title: string;
  icon: string;
  parentId?: string;
  children: Page[];
}

interface SidebarState {
  /** Currently selected/active page ID */
  activePageId: string | null;
  /** Set the active page */
  setActivePageId: (id: string | null) => void;
  /** All pages in the private section */
  privatePages: Page[];
  /** All teamspace pages */
  teamspacePages: Page[];
  /** Add a new page to private section */
  addPrivatePage: (title?: string) => void;
  /** Add a new page inside a teamspace */
  addTeamspacePage: (teamspaceIndex?: number, title?: string) => void;
  /** Add a subpage under an existing page */
  addSubPage: (parentId: string, title?: string) => void;
  /** Delete a page (move to trash) */
  deletePage: (pageId: string) => void;
  /** Trash items */
  trashedPages: Page[];
  /** Restore from trash */
  restorePage: (pageId: string) => void;
  /** Permanently delete from trash */
  permanentlyDelete: (pageId: string) => void;
  /** Whether search dialog is open */
  isSearchOpen: boolean;
  /** Toggle search dialog */
  setSearchOpen: (open: boolean) => void;
  /** Whether trash panel is open */
  isTrashOpen: boolean;
  /** Toggle trash panel */
  setTrashOpen: (open: boolean) => void;
  /** Whether settings panel is open */
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  /** Whether marketplace panel is open */
  isMarketplaceOpen: boolean;
  setMarketplaceOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarState | null>(null);

let nextId = 100;
function generateId() {
  return `page-${nextId++}`;
}

const UNTITLED = "Untitled";

const defaultEmojis = ["📝", "📋", "📌", "📎", "🗂️", "📓", "📒", "📕"];
function randomEmoji() {
  return defaultEmojis[Math.floor(Math.random() * defaultEmojis.length)];
}

function removePage(pages: Page[], id: string): { updated: Page[]; removed: Page | null } {
  let removed: Page | null = null;
  const updated = pages.reduce<Page[]>((acc, page) => {
    if (page.id === id) {
      removed = page;
      return acc;
    }
    const childResult = removePage(page.children, id);
    if (childResult.removed) {
      removed = childResult.removed;
      acc.push({ ...page, children: childResult.updated });
    } else {
      acc.push(page);
    }
    return acc;
  }, []);
  return { updated, removed };
}

function addChildPage(pages: Page[], parentId: string, newPage: Page): Page[] {
  return pages.map((page) => {
    if (page.id === parentId) {
      return { ...page, children: [...page.children, newPage] };
    }
    if (page.children.length > 0) {
      return { ...page, children: addChildPage(page.children, parentId, newPage) };
    }
    return page;
  });
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [activePageId, setActivePageId] = useState<string | null>("page-1");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isTrashOpen, setTrashOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isMarketplaceOpen, setMarketplaceOpen] = useState(false);
  const [trashedPages, setTrashedPages] = useState<Page[]>([]);

  const [privatePages, setPrivatePages] = useState<Page[]>([
    {
      id: "page-1",
      title: "Getting Started",
      icon: "📄",
      children: [],
    },
  ]);

  const [teamspacePages, setTeamspacePages] = useState<Page[]>([
    {
      id: "page-2",
      title: "Issue Tracking",
      icon: "✅",
      children: [
        { id: "page-3", title: "Bug Reports", icon: "🐛", parentId: "page-2", children: [] },
        { id: "page-4", title: "Feature Requests", icon: "✨", parentId: "page-2", children: [] },
      ],
    },
  ]);

  const addPrivatePage = useCallback((title?: string) => {
    const newPage: Page = {
      id: generateId(),
      title: title || UNTITLED,
      icon: randomEmoji(),
      children: [],
    };
    setPrivatePages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
  }, []);

  const addTeamspacePage = useCallback((_teamspaceIndex?: number, title?: string) => {
    const newPage: Page = {
      id: generateId(),
      title: title || UNTITLED,
      icon: randomEmoji(),
      children: [],
    };
    setTeamspacePages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
  }, []);

  const addSubPage = useCallback((parentId: string, title?: string) => {
    const newPage: Page = {
      id: generateId(),
      title: title || UNTITLED,
      icon: randomEmoji(),
      parentId,
      children: [],
    };
    // Try private pages first
    setPrivatePages((prev) => {
      const updated = addChildPage(prev, parentId, newPage);
      if (JSON.stringify(updated) !== JSON.stringify(prev)) return updated;
      return prev;
    });
    // Then teamspace pages
    setTeamspacePages((prev) => {
      const updated = addChildPage(prev, parentId, newPage);
      if (JSON.stringify(updated) !== JSON.stringify(prev)) return updated;
      return prev;
    });
    setActivePageId(newPage.id);
  }, []);

  const deletePage = useCallback((pageId: string) => {
    // Try removing from private pages
    setPrivatePages((prev) => {
      const { updated, removed } = removePage(prev, pageId);
      if (removed) {
        setTrashedPages((t) => [...t, removed]);
        return updated;
      }
      return prev;
    });
    // Try removing from teamspace pages
    setTeamspacePages((prev) => {
      const { updated, removed } = removePage(prev, pageId);
      if (removed) {
        setTrashedPages((t) => [...t, removed]);
        return updated;
      }
      return prev;
    });
    setActivePageId((current) => (current === pageId ? null : current));
  }, []);

  const restorePage = useCallback((pageId: string) => {
    setTrashedPages((prev) => {
      const page = prev.find((p) => p.id === pageId);
      if (page) {
        setPrivatePages((pp) => [...pp, { ...page, children: [] }]);
        return prev.filter((p) => p.id !== pageId);
      }
      return prev;
    });
  }, []);

  const permanentlyDelete = useCallback((pageId: string) => {
    setTrashedPages((prev) => prev.filter((p) => p.id !== pageId));
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        activePageId,
        setActivePageId,
        privatePages,
        teamspacePages,
        addPrivatePage,
        addTeamspacePage,
        addSubPage,
        deletePage,
        trashedPages,
        restorePage,
        permanentlyDelete,
        isSearchOpen,
        setSearchOpen,
        isTrashOpen,
        setTrashOpen,
        isSettingsOpen,
        setSettingsOpen,
        isMarketplaceOpen,
        setMarketplaceOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
