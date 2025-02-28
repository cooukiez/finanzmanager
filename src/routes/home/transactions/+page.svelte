<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./column-def";

  let { data } = $props();

  console.log(data.transactions);
</script>

<div>
  <DataTable columns={columns} data={data.transactions} />
</div>
