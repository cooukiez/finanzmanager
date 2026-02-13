import type { IndexedRoute } from "$lib";
import { adminDashboard } from "$lib/config/routes";

// Admin Dashboard konfigurierung für Navigationsleiste
export const adminRoutes: IndexedRoute[] = [
  {
    name: "Dashboard",
    href: adminDashboard,
    label: "",
    index: 0,
  },
];
