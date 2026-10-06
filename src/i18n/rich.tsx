import { Fragment } from "react";

/** Splits "plain *accent* plain" into alternating runs; odd indexes are the accented parts. */
export const splitAccent = (text: string) => text.split("*");

/** Renders a dictionary heading, wrapping `*...*` runs in the gold italic accent. */
export function Rich({ text, accentClassName = "italic text-gold" }: { text: string; accentClassName?: string }) {
  return splitAccent(text).map((part, i) =>
    i % 2 ? (
      <span key={i} className={accentClassName}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
