import type { ColumnDef } from "@tanstack/table-core";

import { renderComponent } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";

import DataTableActions from "./data-table-actions.svelte";
import DataTableEditableCell from "./data-table-editable-cell.svelte";

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
    accessorKey: "id",
    header: "Transaction ID",
    id: "id",
    cell: ({ row }) => {
      return row.original.id;
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    id: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return renderComponent(DataTableEditableCell, {
        value: amount,
        fieldName: "amount",
        rowId: row.id,
        isNumber: true
      });
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    id: "type",
    cell: ({ row }) => {
      return renderComponent(DataTableEditableCell, {
        value: row.original.type,
        fieldName: "type",
        rowId: row.id
      });
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return renderComponent(DataTableActions, { id: row.original.id });
    }
  }
];
