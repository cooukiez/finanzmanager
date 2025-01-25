import type {IndexedRoute} from "$lib";
import {loremPage} from "$lib/config/routes";

export const homepageRoutes: IndexedRoute[] = [
    {
        name: "Lorem",
        href: loremPage,
        label: "",
        index: 1,
    },
];