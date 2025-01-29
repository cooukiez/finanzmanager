<script lang="ts">
    import DataTable from "./data-table.svelte";
    import {columns} from "./columns.js";

    let {data} = $props();
</script>

<DataTable {columns} {data}/>