<script generics="TData, TValue" lang="ts">
  import { type ColumnDef, getCoreRowModel, type RowSelectionState } from "@tanstack/table-core";
  import { createSvelteTable, FlexRender } from "$lib/components/ui/data-table/index.js";

  import { superForm } from "sveltekit-superforms/client";

  // noinspection ES6UnusedImports
  import * as Table from "$lib/components/ui/table/index.js";

  import { buttonVariants } from "$lib/components/ui/button/index.js";
  // noinspection ES6UnusedImports
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    form: any;
  };

  let { columns, data, form }: DataTableProps<TData, TValue> = $props();

  // Set up superform
  const { form: addForm, enhance, reset } = superForm(form, {
    resetForm: true,
    onResult: ({ result }) => {
      if (result.type === "success") {
        // Close dialog after successful submission
        addDialogOpen = false;
      }
    }
  });

  let rowSelection = $state<RowSelectionState>({});
  let addDialogOpen = $state(false);
  let transactionData = $state<any[]>(data);

  // Function to handle cell edits
  function handleCellEdit(event: CustomEvent<{ rowId: string, fieldName: string, value: any }>) {
    const { rowId, fieldName, value } = event.detail;

    // Find the row in our data
    const rowIndex = parseInt(rowId.replace("row_", ""));

    // Update the value
    if (rowIndex >= 0 && rowIndex < transactionData.length) {
      // Create a copy of the data
      const newData = [...transactionData];
      // Update the specific field
      newData[rowIndex] = {
        ...newData[rowIndex],
        [fieldName]: value
      };

      // Update the data
      transactionData = newData;

      // Here you would typically send an API request to update the data
      // For this demo, we're just updating the local state
    }
  }

  const table = createSvelteTable({
    get data() {
      return data;
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

  function onCellChange(event) {
    handleCellEdit(event);
  }
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
              <div onchange={onCellChange}>
                <FlexRender
                  content={cell.column.columnDef.cell}
                  context={cell.getContext()}
                />
              </div>
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
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "ghost" }) + "flex w-full rounded-t-none border-t"}>Add
      Transaction
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add Transaction</Dialog.Title>
        <Dialog.Description>
          Add new Transaction to account
        </Dialog.Description>
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>
  </div>
</div>
