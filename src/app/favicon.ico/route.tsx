import { appIcon } from "@/lib/app-icon";

export const dynamic = "force-static";

// Replaces the Create Next App triangle: browsers and link-preview crawlers
// fetch /favicon.ico directly, and every modern one accepts a PNG body here.
export function GET() {
  return appIcon(48);
}
