<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { Moon, Sun } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button class="border" onclick={toggleMode} size="icon" variant="secondary">
  <!-- Light mode icon -->
  <Sun
    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  />
  <!-- Dark mode icon -->
  <Moon
    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
