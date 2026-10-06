import { notFound } from "next/navigation";

/** Sends unknown paths under a locale to `[lang]/not-found.tsx`, so the 404 keeps the layout and language. */
export default function CatchAll() {
  notFound();
}
