<script>
    import {Alert, Toast} from 'flowbite-svelte';
    import { InfoCircleSolid, FireOutline } from 'flowbite-svelte-icons';
    export let message;
</script>
<Toast>
    <FireOutline slot="icon" class="w-6 h-6 text-primary-500 bg-primary-100 dark:bg-primary-800 dark:text-primary-200" />
    { message }
</Toast>
