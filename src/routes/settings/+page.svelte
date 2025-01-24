<script lang="ts">
    import {applyAction, enhance} from '$app/forms';

    import AccInfo from "$lib/components/AccInfo.svelte";
    import {Alert, Button} from "flowbite-svelte";

    import type {ActionData, PageData} from './$types';

    let {data, form}: { data: PageData, form: ActionData } = $props();
    let visible = false;
</script>
<div>
    {#if visible = true}
        <AccInfo user={data?.user} />
    {:else}
        <button onclick={() => visible = true} >Change Account Info</button>
    {/if}
</div>
