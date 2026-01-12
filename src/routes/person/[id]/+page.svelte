<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	export let data: PageData;

	$: person = data.person;
	$: years = person.deathYear
		? `${person.birthYear} - ${person.deathYear}`
		: `${person.birthYear} - present`;
</script>

<svelte:head>
	<title>{person.name} | Ratkey Family Tree</title>
</svelte:head>

<div class="person-detail">
	<header>
		<a href="{base}/" class="back-button">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			<span>Back to Tree</span>
		</a>
	</header>

	<main>
		<div class="profile-section">
			<div class="avatar" class:male={person.gender === 'male'} class:female={person.gender === 'female'}>
				{#if person.imageUrl}
					<img src={person.imageUrl} alt={person.name} />
				{:else}
					<div class="placeholder">
						<svg viewBox="0 0 24 24" fill="currentColor">
							<circle cx="12" cy="8" r="4" />
							<ellipse cx="12" cy="20" rx="7" ry="4" />
						</svg>
					</div>
				{/if}
			</div>
			<h1>{person.name}</h1>
			<p class="years">{years}</p>
		</div>

		{#if person.bio && person.bio.length > 0}
			<div class="bio-section">
				{#each person.bio as section}
					{#if section.heading}
						<h2>{section.heading}</h2>
					{/if}
					{#each section.paragraphs as paragraph}
						<p>{paragraph}</p>
					{/each}
				{/each}
			</div>
		{:else}
			<div class="bio-section">
				<p class="no-bio">No additional information available.</p>
			</div>
		{/if}
	</main>
</div>

<style>
	.person-detail {
		min-height: 100vh;
		background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
		color: white;
	}

	header {
		position: sticky;
		top: 0;
		background: rgba(26, 26, 46, 0.95);
		backdrop-filter: blur(10px);
		padding: 12px 16px;
		z-index: 100;
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: white;
		text-decoration: none;
		font-size: 16px;
		padding: 8px 12px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
		transition: background 0.2s;
	}

	.back-button:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	.back-button svg {
		width: 20px;
		height: 20px;
	}

	main {
		padding: 24px 16px 48px;
		max-width: 600px;
		margin: 0 auto;
	}

	.profile-section {
		text-align: center;
		margin-bottom: 32px;
	}

	.avatar {
		width: 140px;
		height: 140px;
		border-radius: 50%;
		margin: 0 auto 20px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar.male {
		background: #4A90D9;
	}

	.avatar.female {
		background: #D94A8C;
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	.placeholder svg {
		width: 80px;
		height: 80px;
	}

	h1 {
		font-size: 28px;
		font-weight: 700;
		margin: 0 0 8px;
	}

	.years {
		font-size: 18px;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
	}

	.bio-section {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		padding: 24px;
	}

	.bio-section h2 {
		font-size: 18px;
		font-weight: 600;
		margin: 0 0 12px;
		color: rgba(255, 255, 255, 0.9);
	}

	.bio-section h2:not(:first-child) {
		margin-top: 24px;
	}

	.bio-section p {
		font-size: 16px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 16px;
	}

	.bio-section p:last-child {
		margin-bottom: 0;
	}

	.no-bio {
		color: rgba(255, 255, 255, 0.5);
		font-style: italic;
		text-align: center;
	}
</style>
