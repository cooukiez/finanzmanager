import { writable } from "svelte/store";

export const cellEditStore = writable<{ rowId: string, fieldName: string, value: any } | null>(null);