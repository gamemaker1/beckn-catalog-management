<script lang="ts">
	import Carousel from 'svelte-carousel'

	import type { Category } from '../types'

	/**
	 * A list of categories to display. To be passed in as a prop to this component.
	 */
	export let categories: Category[]
	/**
	 * The message to display when the list is empty.
	 */
	export let emptyListMessage: string = 'Nothing to see here...'
	/**
	 * The callback fired when a category is selected.
	 *
	 * @param {string} categoryId - The selected category's ID.
	 */
	export let onSelect: (categoryId: string) => void = () => {}
</script>

<template>
	{#if !categories?.length}
		<span class="message">{emptyListMessage}</span>
	{:else}
		<div class="carousel">
			<Carousel id="catalog-carousel" class="center" particlesToShow={2}>
				{#each categories as category}
					<div class="card category-card">
						<table class="center" on:click={() => onSelect(category.id)}>
							<tr>
								<img src={category.image} alt={`Image of ${category.name}`} />
							</tr>
							<tr>
								<span class="title">{category.name}</span>
							</tr>
						</table>
					</div>
				{/each}
			</Carousel>
		</div>
	{/if}
</template>

<style>
	img {
		max-width: 52px;
		min-width: 52px;
	}

	.center {
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}
	.title {
		font-family: 'Poppins', sans-serif;
		font-size: 16px;
		font-weight: 600;
		margin: 0em;
	}
	.message {
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: 400;
	}

	.card {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
		border-radius: 1em;
		padding: 0.2em;
	}
	.card:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
	.card:active {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	}

	.category-card {
		height: 6em;
		width: 4em;
		max-height: 6em;
		max-width: 4em;
		margin: 0.5em 2em;
	}

	.carousel {
		overflow: auto;
		max-width: 20em;
		margin: 2em;
	}
</style>
