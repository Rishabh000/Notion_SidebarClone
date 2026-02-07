"use client";

import { ReactNode, useCallback } from "react";
import { COLORS } from "./constants";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  rightActions?: ReactNode;
  indent?: number;
  secondaryLabel?: boolean;
}

export function SidebarItem({
  icon,
  label,
  isActive = false,
  onClick,
  rightActions,
  indent = 0,
  secondaryLabel = false,
}: SidebarItemProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && onClick) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <div
      className="sidebar-item group flex items-center gap-2 rounded-[4px] cursor-pointer select-none transition-colors duration-75"
      style={{
        padding: `4px 8px 4px ${8 + indent * 24}px`,
        backgroundColor: isActive ? COLORS.bg.active : undefined,
        minHeight: "30px",
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      title={label}
    >
      <span className="flex-shrink-0 w-[22px] h-[22px] flex items-center justify-center">
        {icon}
      </span>
      <span
        className="flex-1 truncate text-sm leading-[1.2]"
        style={{
          color: secondaryLabel ? COLORS.text.secondary : COLORS.text.primary,
        }}
      >
        {label}
      </span>
      {rightActions && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
          {rightActions}
        </div>
      )}
    </div>
  );
}
