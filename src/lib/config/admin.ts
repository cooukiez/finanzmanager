import type { IndexedRoute } from "$lib";
import { adminDashboard, loremPage } from "$lib/config/routes";

export const adminRoutes: IndexedRoute[] = [
  {
    name: "Dashboard",
    href: adminDashboard,
    label: "",
    index: 0,
  },
];
