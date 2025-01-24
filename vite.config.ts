import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		sourcemap: true,
	},
	optimizeDeps: {
		include: ['flowbite-svelte', 'flowbite-svelte-icons'],
	},
});
