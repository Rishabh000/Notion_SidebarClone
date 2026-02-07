/**
 * Notion sidebar design tokens.
 * Extracted from Notion's actual CSS to ensure pixel-perfect fidelity.
 */
export const SIDEBAR = {
  /** Default sidebar width in pixels */
  DEFAULT_WIDTH: 240,
  /** Minimum sidebar width when resizing */
  MIN_WIDTH: 200,
  /** Maximum sidebar width when resizing */
  MAX_WIDTH: 480,
} as const;

export const COLORS = {
  text: {
    primary: "rgb(55, 53, 47)",
    secondary: "rgba(55, 53, 47, 0.65)",
    tertiary: "rgba(55, 53, 47, 0.45)",
  },
  bg: {
    sidebar: "#fbfbfa",
    hover: "rgba(55, 53, 47, 0.04)",
    active: "rgba(55, 53, 47, 0.08)",
    overlay: "rgba(15, 15, 15, 0.6)",
  },
  border: "rgba(55, 53, 47, 0.09)",
  accent: {
    blue: "#2383e2",
    workspace: "#c5a070",
    teamspace: "#448361",
    red: "#e16259",
  },
} as const;

export const ICON = {
  size: 18,
  strokeWidth: 1.8,
  smallSize: 14,
  tinySize: 12,
} as const;
