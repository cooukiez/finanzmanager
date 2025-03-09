<script generics="TData, TValue" lang="ts">
  import { type ColumnDef, getCoreRowModel, type RowSelectionState } from "@tanstack/table-core";
  import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table/index.js";
  import { superForm } from "sveltekit-superforms/client";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { cellEditStore } from "./stores";

  // noinspection ES6UnusedImports
  import * as Table from "$lib/components/ui/table/index.js";
  // noinspection ES6UnusedImports
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  // Component props
  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    form: any;
  };

  let { columns, data, form }: DataTableProps<TData, TValue> = $props();

  // State management
  let rowSelection = $state<RowSelectionState>({});
  let addDialogOpen = $state(false);
  let transactionData = $state<any[]>([...data.map(item => ({ ...item }))]);

  // Set up superform
  const { form: addForm, enhance, reset } = superForm(form, {
    resetForm: true,
    onResult: ({ result }) => {
      if (result.type === "success") {
        addDialogOpen = false;
      }
    }
  });

  // Subscribe to cell edit store
  const unsubscribe = cellEditStore.subscribe((editData) => {
    if (editData) {
      handleCellEdit(editData);
    }
  });

  // Cell edit handler
  function handleCellEdit(editData: { rowId: string, fieldName: string, value: any }) {
    const { rowId, fieldName, value } = editData;
    const rowIndex = parseInt(rowId.replace("row_", ""));

    // Validate row index
    if (isNaN(rowIndex) || rowIndex < 0 || rowIndex >= transactionData.length) {
      console.error("Invalid row index:", rowIndex);
      return;
    }

    let transactionId = "";
    let updatedTransaction = { amount: 0, type: "" };

    // Update the state
    transactionData = transactionData.map((row, index) => {
      if (index === rowIndex) {
        transactionId = row.id || "";
        const updatedRow = { ...row, [fieldName]: value };

        updatedTransaction = {
          amount: updatedRow.amount || 0,
          type: updatedRow.type || ""
        };

        return updatedRow;
      }
      return row;
    });

    // Update in database
    updateTransactionInDatabase(
      transactionId,
      updatedTransaction.amount,
      updatedTransaction.type
    );
  }

  // Database update function
  async function updateTransactionInDatabase(transactionId: string, amount: number, type: string) {
    try {
      const response = await fetch("/api/transactions/update", {
        method: "PATCH",
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
        console.error("Error updating transaction:", errorData);
        return;
      }

      // Response is not needed but consume it anyway
      await response.json();
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  }

  // Table configuration
  const table = createSvelteTable({
    get data() {
      return transactionData;
    },
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    },
    state: {
      get rowSelection() {
        return rowSelection;
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
      <Dialog.Trigger class="{buttonVariants({ variant: 'ghost' })} flex w-full rounded-t-none border-t">
        Add Transaction
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Add Transaction</Dialog.Title>
          <Dialog.Description>
            Add new Transaction to account
          </Dialog.Description>
        </Dialog.Header>
        <!-- Form content would go here -->
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>