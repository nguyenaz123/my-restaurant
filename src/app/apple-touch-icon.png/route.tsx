import { appIcon } from "@/lib/app-icon";

// Served at the path iOS probes by default, and linked from the layout metadata.
export const dynamic = "force-static";

export function GET() {
  return appIcon(180);
}
