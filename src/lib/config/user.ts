import type {IndexedRoute} from "$lib";
import {loremPage, userAccounts, userGroups, userHomepage} from "$lib/config/routes";

export const userRoutes: IndexedRoute[] = [
    {
        name: "Home",
        href: userHomepage,
        label: "",
        index: 0,
    },
    {
        name: "Lorem",
        href: loremPage,
        label: "",
        index: 1,
    },
    {
        name: "Accounts",
        href: userAccounts,
        label: "",
        index: 1,
    },
    {
        name: "Groups",
        href: userGroups,
        label: "",
        index: 1,
    },
];