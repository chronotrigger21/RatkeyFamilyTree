<script lang="ts">
	import FamilyTree from '$lib/components/FamilyTree.svelte';
	import { sampleFamilyTree } from '$lib/data/familyData';
</script>

<svelte:head>
	<title>Ratkey Family Tree</title>
	<meta name="description" content="Interactive Ratkey family tree visualization" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
</svelte:head>

<main>
	<FamilyTree data={sampleFamilyTree} />
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
</style>
