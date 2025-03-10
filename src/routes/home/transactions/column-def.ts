import type { ColumnDef } from "@tanstack/table-core";

import { renderComponent } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";

import DataTableActions from "./components/data-table-actions.svelte";
import DataTableEditableCell from "./components/data-table-editable-cell.svelte";

import type { TransactionType } from "./schema";

// Definiert die Spalten für die Tabelle mit den Transaktionsdaten
export const columns: ColumnDef<TransactionType>[] = [
  {
    id: "select",
    // Kopfzeile der Auswahl-Spalte, die es ermöglicht, alle Zeilen auszuwählen
    header: ({ table }) =>
      renderComponent(Checkbox, {
        checked: table.getIsAllPageRowsSelected(), // Wenn alle Zeilen auf der Seite ausgewählt sind, ist das Kontrollkästchen aktiviert
        indeterminate:
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected(), // Wenn einige Zeilen, aber nicht alle, ausgewählt sind, wird das Kontrollkästchen teilweise markiert
        onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value), // Alle Zeilen auswählen/deselektieren, wenn das Kontrollkästchen geändert wird
        "aria-label": "Select all" // Zugänglichkeitslabel
      }),
    // Zelleninhalt für die Auswahl jeder einzelnen Zeile
    cell: ({ row }) =>
      renderComponent(Checkbox, {
        checked: row.getIsSelected(), // Wenn die Zeile ausgewählt ist, wird das Kontrollkästchen aktiviert
        onCheckedChange: (value) => row.toggleSelected(!!value), // Zeile auswählen/deselektieren, wenn das Kontrollkästchen geändert wird
        "aria-label": "Select row" // Zugänglichkeitslabel für jede Zeile
      }),
    enableSorting: false, // Sortierung für diese Spalte deaktivieren
    enableHiding: false // Verstecken der Spalte deaktivieren
  },
  {
    accessorKey: "id", // Schlüssel für den Zugriff auf die ID der Transaktion
    header: "Transaction ID", // Kopfzeile der Spalte
    id: "id",
    cell: ({ row }) => {
      // Zeigt die Transaktions-ID in der Zelle an
      return row.original.id;
    }
  },
  {
    accessorKey: "amount", // Schlüssel für den Zugriff auf den Betrag
    header: "Amount", // Kopfzeile der Spalte für den Betrag
    id: "amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount")); // Den Betrag als Zahl parsen

      // Rendert die Zelle als bearbeitbare Zelle für den Betrag
      return renderComponent(DataTableEditableCell, {
        transactionId: row.original.id,
        fieldName: "amount",
        value: amount,
        isNumber: true // Der Wert ist eine Zahl
      });
    }
  },
  {
    accessorKey: "type", // Schlüssel für den Zugriff auf den Transaktionstyp
    header: "Type", // Kopfzeile der Spalte für den Typ
    id: "type",
    cell: ({ row }) => {
      // Rendert die Zelle als bearbeitbare Zelle für den Typ
      return renderComponent(DataTableEditableCell, {
        transactionId: row.original.id,
        fieldName: "type",
        value: row.original.type
      });
    }
  },
  {
    id: "actions", // Spalte für die Aktionen (z.B. bearbeiten, löschen)
    cell: ({ row }) => {
      // Rendert die Aktionskomponente für jede Zeile
      return renderComponent(DataTableActions, { id: row.original.id });
    }
  }
];
