import type {IndexedRoute} from "$lib";
import {loremPage, publicHomepage} from "$lib/config/routes";

export const homepageRoutes: IndexedRoute[] = [
    {
        name: "Homepage",
        href: publicHomepage,
        label: "",
        index: 0,
    },
    {
        name: "Lorem",
        href: loremPage,
        label: "",
        index: 1,
    },
];