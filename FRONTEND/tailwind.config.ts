import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-container": "#aeb9d0",
        "inverse-on-surface": "#233143",
        "surface-variant": "#273647",
        "tertiary-fixed-dim": "#dec29a",
        "on-background": "#d4e4fa",
        "surface-container": "#122131",
        "on-error-container": "#ffdad6",
        "surface-bright": "#2c3a4c",
        "tertiary": "#dec29a",
        "on-tertiary-container": "#957d5a",
        "surface-tint": "#bec6e0",
        "on-tertiary-fixed-variant": "#574425",
        "background": "#051424",
        "surface-container-low": "#0d1c2d",
        "secondary-fixed": "#d8e3fb",
        "primary-fixed": "#dae2fd",
        "tertiary-fixed": "#fcdeb5",
        "tertiary-container": "#231500",
        "surface": "#051424",
        "inverse-primary": "#565e74",
        "outline": "#909097",
        "surface-container-high": "#1c2b3c",
        "surface-container-highest": "#273647",
        "inverse-surface": "#d4e4fa",
        "secondary-fixed-dim": "#bcc7de",
        "on-surface": "#d4e4fa",
        "primary": "#bec6e0",
        "on-secondary": "#263143",
        "error-container": "#93000a",
        "on-error": "#690005",
        "primary-fixed-dim": "#bec6e0",
        "surface-dim": "#051424",
        "on-primary-container": "#798098",
        "on-tertiary": "#3e2d11",
        "outline-variant": "#45464d",
        "secondary": "#bcc7de",
        "surface-container-lowest": "#010f1f",
        "error": "#ffb4ab",
        "primary-container": "#0f172a",
        "on-primary": "#283044",
        "on-secondary-fixed": "#111c2d",
        "on-primary-fixed": "#131b2e",
        "secondary-container": "#3e495d",
        "on-secondary-fixed-variant": "#3c475a",
        "on-surface-variant": "#c6c6cd",
        "on-primary-fixed-variant": "#3f465c",
        "on-tertiary-fixed": "#271901"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
        "2xl": "24px"
      },
      spacing: {
        "base": "4px",
        "section-gap": "48px",
        "gutter": "16px",
        "container-padding": "24px",
        "128": "32rem",
      },
      fontFamily: {
        "headline-lg-mobile": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "label-caps": ["JetBrains Mono", "monospace"],
        "display-lg": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "stats-number": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0.01em", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0.01em", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "0", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.08em", fontWeight: "500" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "stats-number": ["20px", { lineHeight: "24px", letterSpacing: "0", fontWeight: "700" }]
      }
    }
  },
  plugins: [],
};
export default config;
