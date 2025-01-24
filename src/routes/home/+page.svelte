<script lang="ts">
    import type {PageData} from "./$types";

    export let data: PageData;
</script>

<h1>Hi, {data.user?.name}!</h1>
<p>Your user ID is {data.user?.id}.</p>