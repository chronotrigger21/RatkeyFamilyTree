<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import type { FamilyNode } from '$lib/data/familyData';

	export let data: FamilyNode;

	let container: HTMLDivElement;
	let svg: SVGSVGElement;

	// Node dimensions
	const nodeWidth = 140;
	const nodeHeight = 80;
	const nodeRadius = 8;

	// Colors
	const maleColor = '#4A90D9';
	const femaleColor = '#D94A8C';
	const linkColor = '#888';

	onMount(() => {
		const width = container.clientWidth;
		const height = container.clientHeight;

		// Create D3 hierarchy from data
		const root = d3.hierarchy(data, (d) => d.children);

		// Create tree layout
		const treeLayout = d3.tree<FamilyNode>().nodeSize([nodeWidth + 20, nodeHeight + 60]);

		treeLayout(root);

		// Calculate bounds to center the tree
		let minX = Infinity,
			maxX = -Infinity,
			minY = Infinity,
			maxY = -Infinity;
		root.each((d) => {
			if (d.x < minX) minX = d.x;
			if (d.x > maxX) maxX = d.x;
			if (d.y < minY) minY = d.y;
			if (d.y > maxY) maxY = d.y;
		});

		const treeWidth = maxX - minX + nodeWidth;
		const treeHeight = maxY - minY + nodeHeight;

		// Setup SVG with D3
		const svgSelection = d3.select(svg).attr('width', width).attr('height', height);

		// Create a group for zooming/panning
		const g = svgSelection.append('g');

		// Setup zoom behavior
		const zoom = d3
			.zoom<SVGSVGElement, unknown>()
			.scaleExtent([0.3, 3])
			.on('zoom', (event) => {
				g.attr('transform', event.transform);
			});

		svgSelection.call(zoom);

		// Center the tree initially
		const initialX = width / 2 - (minX + maxX) / 2;
		const initialY = 50 - minY;
		const initialTransform = d3.zoomIdentity.translate(initialX, initialY);
		svgSelection.call(zoom.transform, initialTransform);

		// Draw links (connections between nodes)
		const linkGenerator = d3
			.linkVertical<d3.HierarchyLink<FamilyNode>, d3.HierarchyPointNode<FamilyNode>>()
			.x((d) => d.x)
			.y((d) => d.y + nodeHeight / 2);

		g.selectAll('.link')
			.data(root.links())
			.join('path')
			.attr('class', 'link')
			.attr('fill', 'none')
			.attr('stroke', linkColor)
			.attr('stroke-width', 2)
			.attr('d', (d) =>
				linkGenerator({
					source: { ...d.source, y: d.source.y + nodeHeight / 2 } as any,
					target: { ...d.target, y: d.target.y - nodeHeight / 2 } as any
				})
			);

		// Draw nodes
		const nodes = g
			.selectAll('.node')
			.data(root.descendants())
			.join('g')
			.attr('class', 'node')
			.attr('transform', (d) => `translate(${d.x - nodeWidth / 2}, ${d.y - nodeHeight / 2})`);

		// Node background rectangle
		nodes
			.append('rect')
			.attr('width', nodeWidth)
			.attr('height', nodeHeight)
			.attr('rx', nodeRadius)
			.attr('ry', nodeRadius)
			.attr('fill', (d) => (d.data.person.gender === 'male' ? maleColor : femaleColor));

		// Placeholder image circle
		const imageSize = 36;
		const imageX = 10;
		const imageY = (nodeHeight - imageSize) / 2;

		// Clip path for circular image
		const defs = svgSelection.append('defs');
		defs
			.append('clipPath')
			.attr('id', 'avatar-clip')
			.append('circle')
			.attr('r', imageSize / 2);

		// Avatar background circle
		nodes
			.append('circle')
			.attr('cx', imageX + imageSize / 2)
			.attr('cy', imageY + imageSize / 2)
			.attr('r', imageSize / 2)
			.attr('fill', '#ddd');

		// Placeholder silhouette (simple head shape)
		nodes
			.append('circle')
			.attr('cx', imageX + imageSize / 2)
			.attr('cy', imageY + imageSize / 2 - 4)
			.attr('r', 8)
			.attr('fill', '#999');

		nodes
			.append('ellipse')
			.attr('cx', imageX + imageSize / 2)
			.attr('cy', imageY + imageSize / 2 + 12)
			.attr('rx', 10)
			.attr('ry', 7)
			.attr('fill', '#999');

		// Name text
		const textX = imageX + imageSize + 8;
		nodes
			.append('text')
			.attr('x', textX)
			.attr('y', nodeHeight / 2 - 6)
			.attr('fill', 'white')
			.attr('font-size', '11px')
			.attr('font-weight', 'bold')
			.text((d) => {
				const name = d.data.person.name;
				// Truncate long names
				return name.length > 12 ? name.substring(0, 11) + '...' : name;
			});

		// Years text
		nodes
			.append('text')
			.attr('x', textX)
			.attr('y', nodeHeight / 2 + 10)
			.attr('fill', 'rgba(255,255,255,0.85)')
			.attr('font-size', '10px')
			.text((d) => {
				const birth = d.data.person.birthYear;
				const death = d.data.person.deathYear;
				return death ? `${birth} - ${death}` : `${birth} - present`;
			});
	});
</script>

<div bind:this={container} class="family-tree-container">
	<svg bind:this={svg}></svg>
</div>

<style>
	.family-tree-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		touch-action: none;
		background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
	}

	.family-tree-container svg {
		display: block;
	}

	:global(.node) {
		cursor: pointer;
	}

	:global(.node:hover rect) {
		filter: brightness(1.1);
	}
</style>
