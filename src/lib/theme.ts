/**
 * Visual themes. Each one is a set of token overrides in globals.css keyed by
 * `<html data-theme>`; components only ever use the tokens, never theme checks.
 * Adding a theme means adding its id here, its tokens in globals.css and its
 * name in every dictionary (`dict.theme.names`).
 */
export const themes = ["ember", "retro", "glass", "liquid", "neobrutal", "memphis"] as const;
export type Theme = (typeof themes)[number];
export const defaultTheme: Theme = "ember";

export const THEME_STORAGE_KEY = "ember-theme";

/** Browser chrome colour per theme, mirrored from `--color-obsidian`. */
export const themeColors: Record<Theme, string> = {
  ember: "#0d0d0d",
  retro: "#ebe1ca",
  glass: "#0b1416",
  liquid: "#e9edf2",
  neobrutal: "#fff4cf",
  memphis: "#f4fbf8",
};

/** Preview chips for the theme menu: background, accent, text. Mirrors each theme's tokens. */
export const themeSwatches: Record<Theme, readonly [string, string, string]> = {
  ember: ["#0d0d0d", "#c5a059", "#f4efeb"],
  retro: ["#ebe1ca", "#9b3222", "#2a1d14"],
  glass: ["#0b1416", "#e9b872", "#4fd1a5"],
  liquid: ["#e9edf2", "#0a66d8", "#ffffff"],
  neobrutal: ["#fff4cf", "#2340ff", "#141414"],
  memphis: ["#f4fbf8", "#c2185b", "#2ec4b6"],
};

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (themes as readonly string[]).includes(value);
}

/**
 * Runs in <head> before first paint so a returning visitor never sees the
 * default theme flash. Kept tiny and dependency-free; it is inlined as a string.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var c=${JSON.stringify(themeColors)};if(t&&c[t]){document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",c[t]);}}catch(e){}})();`;
