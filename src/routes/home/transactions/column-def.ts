import type { ColumnDef } from "@tanstack/table-core";

import { renderComponent, renderSnippet } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";

import { createRawSnippet } from "svelte";

import DataTableActions from "./data-table-actions.svelte";
import DataTableTypeInput from "./data-table-type-input.svelte";

import type { TransactionType } from "./schema";

export const columns: ColumnDef<TransactionType>[] = [
  {
    id: "select",
    header: ({ table }) =>
      renderComponent(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected(),
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all"
      }),
    cell: ({ row }) =>
      renderComponent(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value) => row.toggleSelected(!!value),
        "aria-label": "Select row"
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "amount",
    header: () => {
      const amountHeaderSnippet = createRawSnippet(() => ({
        render: () => `<div>Amount</div>`
      }));
      return renderSnippet(amountHeaderSnippet, "");
    },
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
      });

      const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
        const amount = getAmount();
        return {
          render: () => `<div class="font-medium">${amount}</div>`
        };
      });

      return renderSnippet(
        amountCellSnippet,
        formatter.format(parseFloat(row.getValue("amount")))
      );
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    id: "type",
    cell: ({ row }) => {
      return renderComponent(DataTableTypeInput, { transactionType: row.original.type });
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { id: row.original.type });
    }
  }
];
