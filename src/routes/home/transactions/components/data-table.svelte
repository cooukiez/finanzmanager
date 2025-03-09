<script generics="TData, TValue" lang="ts">
  import { type ColumnDef, getCoreRowModel, type RowSelectionState } from "@tanstack/table-core";
  import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table";
  import { superForm } from "sveltekit-superforms/client";
  import { buttonVariants } from "$lib/components/ui/button";
  import { cellEditStore } from "../stores";

  // noinspection ES6UnusedImports
  import * as Table from "$lib/components/ui/table";
  // noinspection ES6UnusedImports
  import * as Dialog from "$lib/components/ui/dialog";
  // noinspection ES6UnusedImports
  import * as Form from "$lib/components/ui/form";

  import { Input } from "$lib/components/ui/input";
  import type { TransactionType } from "../schema";

  import type { SuperValidated } from "sveltekit-superforms";

  // Komponenteneigenschaften definieren
  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]; // Definiert die Spalten der Tabelle
    data: TData[]; // Die Daten, die in der Tabelle angezeigt werden
    formInput: SuperValidated<TransactionType>; // Das Superform-Objekt für die Validierung des Formulars
    accountId: string; // Die ID des Kontos, das in der Tabelle bearbeitet wird
  };

  // Zuweisung der Komponenteneigenschaften
  let { columns, data, formInput, accountId }: DataTableProps<TData, TValue> = $props();

  // Zustandsverwaltung
  let rowSelection = $state<RowSelectionState>({}); // Auswahl der Tabellenzeilen
  let addDialogOpen = $state(false); // Steuerung des Dialogs zum Hinzufügen von Transaktionen
  let transactionData = $state<any[]>([...data.map(item => ({ ...item }))]); // Kopie der Transaktionsdaten, um Änderungen lokal zu speichern

  // Superform einrichten
  const form = superForm(formInput, {
    resetForm: true, // Setzt das Formular nach dem Absenden zurück
    onResult: ({ result }) => {
      console.log(result);
      if (result.type === "success") {
        addDialogOpen = false; // Schließt den Dialog, wenn die Transaktion erfolgreich hinzugefügt wurde
        transactionData = [...transactionData, result.data?.form.data]; // Fügt die neue Transaktion zu den Daten hinzu
      }
    }
  });

  const { form: formData, enhance } = form; // Die Formulardaten und eine Funktion zur Verbesserung der Formularvalidierung

  // Abonnieren des cellEditStore, um auf Zellbearbeitungen zu reagieren
  const unsubscribe = cellEditStore.subscribe((editData) => {
    if (editData) {
      handleCellEdit(editData); // Bearbeitet die Zelländerung
    }
  });

  // Handler für die Bearbeitung einer Zelle
  function handleCellEdit(editData: { rowId: string, fieldName: string, value: any }) {
    const { rowId, fieldName, value } = editData;
    const rowIndex = parseInt(rowId.replace("row_", "")); // Extrahiert den Index der Zeile

    // Überprüft, ob der Index gültig ist
    if (isNaN(rowIndex) || rowIndex < 0 || rowIndex >= transactionData.length) {
      console.error("Ungültiger Zeilenindex:", rowIndex);
      return;
    }

    let transactionId = "";
    let updatedTransaction = { amount: 0, type: "" };

    // Aktualisiert den Zustand der Transaktionsdaten
    transactionData = transactionData.map((row, index) => {
      if (index === rowIndex) {
        transactionId = row.id || "";
        const updatedRow = { ...row, [fieldName]: value }; // Aktualisiert die spezifische Zelle in der Zeile

        updatedTransaction = {
          amount: updatedRow.amount || 0,
          type: updatedRow.type || ""
        };

        return updatedRow;
      }
      return row;
    });

    // Aktualisiert die Transaktion in der Datenbank
    updateTransactionInDatabase(
      transactionId,
      updatedTransaction.amount,
      updatedTransaction.type
    );
  }

  // Funktion, um die Transaktion in der Datenbank zu aktualisieren
  async function updateTransactionInDatabase(transactionId: string, amount: number, type: string) {
    try {
      const response = await fetch("/api/transactions/update", {
        method: "PATCH", // PATCH-Methode zum Aktualisieren
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          transactionId,
          amount,
          type
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Fehler beim Aktualisieren der Transaktion:", errorData);
        return;
      }

      // Antwort wird nicht benötigt, aber trotzdem verarbeitet
      await response.json();
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Transaktion:", error);
    }
  }

  // Tabellenkonfiguration
  const table = createSvelteTable({
    get data() {
      return transactionData; // Gibt die Transaktionsdaten für die Tabelle zurück
    },
    columns, // Die Spalten für die Tabelle
    getCoreRowModel: getCoreRowModel(), // Modell für die Zeilen
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection); // Aktualisiert die Auswahl der Zeilen
      } else {
        rowSelection = updater; // Setzt die neue Auswahl
      }
    },
    state: {
      get rowSelection() {
        return rowSelection; // Gibt den Zustand der Zeilenauswahl zurück
      }
    }
  });
</script>

<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head>
              {#if !header.isPlaceholder}
                <FlexRender
                  content={header.column.columnDef.header}
                  context={header.getContext()}
                />
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body>
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row data-state={row.getIsSelected() && "selected"}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell>
              <FlexRender
                content={cell.column.columnDef.cell}
                context={cell.getContext()}
              />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">
            Keine Ergebnisse
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>

  <div>
    <Dialog.Root bind:open={addDialogOpen}>
      <Dialog.Trigger class="{buttonVariants({ variant: 'ghost' })} flex h-[3rem] w-full rounded-t-none border-t">
        Transaktion hinzufügen
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Transaktion hinzufügen</Dialog.Title>
          <Dialog.Description>
            Füge eine neue Transaktion zum Konto hinzu
          </Dialog.Description>
        </Dialog.Header>
        <form method="POST" use:enhance>
          <Form.Field {form} name="amount">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Betrag</Form.Label>
                <Input
                  {...props}
                  bind:value={$formData.amount}
                  type="number"
                />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field {form} name="type">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Transaktionstyp</Form.Label>
                <Input {...props} bind:value={$formData.type} />
              {/snippet}
            </Form.Control>
            <Form.Description />
            <Form.FieldErrors />
          </Form.Field>
          <Form.Field {form} name="accountId">
            <Form.Control>
              {#snippet children({ props })}
                <Input type="hidden" name="accountId" value={accountId} />
              {/snippet}
            </Form.Control>
          </Form.Field>
          <Form.Button class="mt-4">Absenden</Form.Button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>