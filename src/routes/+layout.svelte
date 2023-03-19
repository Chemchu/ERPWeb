<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css';
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { LayoutData } from './$types'
	
	export let data: LayoutData

	$: ({ supabase } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="container" style="padding: 50px 0 100px 0">
	<slot />
</div>
