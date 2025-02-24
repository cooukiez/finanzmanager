<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./column-def";

  let { data } = $props();

  console.log(data.transactions);
</script>

<div class="flex flex-col">
  <DataTable columns={columns} data={data.transactions} />
  <div>

  </div>
</div>
