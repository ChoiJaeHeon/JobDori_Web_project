<script>
    import { onMount } from 'svelte'
	export let src;
    
	let loaded = false;
	let failed = false;
	let loading = false;
    
	onMount(() => {
        const img = new Image();
        img.src = src;
        loading = true;
        
        img.onload = () => {
            loading = false;
            loaded = true;
        };
        img.onerror = () => {
            loading = false;
            failed = true;
        };
	})
</script>

{#if loaded}
    <img {src} alt="Logo" />
{:else if failed}
    <img {src} alt="Not Found" />
{:else if loading}
    <img {src} alt="Loading..." />
{/if}

<style>
    img {
        width: 50px;
        height: auto;
    }
</style>