import {
  Bot,
  Globe,
  MessagesSquare,
  Sparkles,
  Mail,
  FileText,
  Search,
  CalendarCheck,
  Clock,
  MapPin,
  Check,
} from "lucide-react";
import type { IconName } from "@/content/schema";

/**
 * Ikony vybírané v administraci. Do obsahu se ukládá jen název, protože
 * komponenta se do JSONu uložit nedá — překlad názvu na obrázek patří sem.
 */
const MAP = {
  bot: Bot,
  globe: Globe,
  chat: MessagesSquare,
  spark: Sparkles,
  mail: Mail,
  file: FileText,
  search: Search,
  calendar: CalendarCheck,
  clock: Clock,
  pin: MapPin,
  check: Check,
} as const satisfies Record<IconName, unknown>;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp className={className} />;
}
