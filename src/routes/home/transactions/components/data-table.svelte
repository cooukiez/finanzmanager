<script generics="TData, TValue" lang="ts">
  import { type ColumnDef, getCoreRowModel, type RowSelectionState } from "@tanstack/table-core";
  import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table";

  import { superForm } from "sveltekit-superforms/client";
  import type { SuperValidated } from "sveltekit-superforms";

  import type { TransactionType } from "../schema";

  // noinspection ES6UnusedImports
  import * as Table from "$lib/components/ui/table";
  // noinspection ES6UnusedImports
  import * as Dialog from "$lib/components/ui/dialog";
  // noinspection ES6UnusedImports
  import * as Form from "$lib/components/ui/form";

  import { Input } from "$lib/components/ui/input";
  import { buttonVariants } from "$lib/components/ui/button";

  import { cellEditStore } from "../stores";

  // Komponenteneigenschaften definieren
  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    formInput: SuperValidated<TransactionType>;
    accountId: string;
  };

  // Zuweisung der Komponenteneigenschaften
  let { columns, data, formInput, accountId }: DataTableProps<TData, TValue> = $props();

  // Zustandsverwaltung
  let rowSelection = $state<RowSelectionState>({});
  let addDialogOpen = $state(false);

  // Create initial derived data
  let transactionData = $derived<any[]>([...data.map(item => ({ ...item }))]);

  // Create a separate writable store for edits
  let editableTransactionData = $state<any[]>([]);

  // Update editable data whenever derived data changes
  $effect(() => {
    editableTransactionData = [...transactionData];
  });

  const form = superForm(formInput, {
    resetForm: true,
    onResult: ({ result }) => {
      if (result.type === "success") {
        addDialogOpen = false; // Schließt den Dialog, wenn die Transaktion erfolgreich hinzugefügt wurde
      }
    }
  });

  const { form: formData, enhance } = form;

  // Abonnieren des cellEditStore, um auf Zellbearbeitungen zu reagieren
  cellEditStore.subscribe((editData) => {
    if (editData) {
      handleCellEdit(editData); // Bearbeitet die Zelländerung
    }
  });

  // Handler für die Bearbeitung einer Zelle
  function handleCellEdit(editData: { transactionId: string, fieldName: string, value: any }) {
    const { transactionId, fieldName, value } = editData;

    // Aktualisiert den Zustand der Transaktionsdaten
    editableTransactionData = editableTransactionData.map((row, _) => {
      if (row.id === transactionId) {
        // Aktualisiert die spezifische Zelle in der Zeile
        return { ...row, [fieldName]: value };
      }
      return row;
    });
  }

  // Tabellenkonfiguration
  const table = createSvelteTable({
    get data() {
      return editableTransactionData;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
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
            No results
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>

  <div>
    <Dialog.Root bind:open={addDialogOpen}>
      <Dialog.Trigger class="{buttonVariants({ variant: 'ghost' })} flex h-[3rem] w-full rounded-t-none border-t">
        Add Transaction
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Add Transaction</Dialog.Title>
          <Dialog.Description>
            Add new transaction to account
          </Dialog.Description>
        </Dialog.Header>
        <form method="POST" use:enhance>
          <Form.Field {form} name="amount">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Amount</Form.Label>
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
                <Form.Label>Transaction type</Form.Label>
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
          <Form.Button class="mt-4">Create</Form.Button>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>