<script lang="ts">
	import { PlusIcon, MinusIcon } from 'svelte-feather-icons'

	import type { Product } from '../types'

	/**
	 * A list of products to display. To be passed in as a prop to this component.
	 */
	export let products: Product[]
	/**
	 * The message to display when the list is empty.
	 */
	export let emptyListMessage: string = 'Nothing to see here...'
	/**
	 * Update a product in the list.
	 *
	 * @param {Product} updatedProduct - The updated version of the product. The product ID should never be updated and may be used to find the existing product.
	 */
	export let updateProduct: (updatedProduct: Product) => void
</script>

<template>
	{#if !products?.length}
		<span class="center message empty-list-message">{emptyListMessage}</span>
	{:else}
		<div class="items">
			{#each products as product}
				<div>
					<table class="center">
						<tr>
							<table>
								<tr>
									<td class="center-vertical">
										<img
											class="center-vertical left-align"
											src={product.image}
											alt={`Image of ${product.name}`}
										/>
									</td>
									<td colspan="2">
										<span class="title left-align">
											{product.name}
										</span>
									</td>
								</tr>
								<tr>
									<td>
										<span class="message left-align">
											{product.quantity.magnitude}
											{product.quantity.unit}
										</span>
									</td>
									<td>
										<span class="message left-align">
											{product.price.currency}
											{product.price.amount}
										</span>
									</td>
									<td>
										<div
											style="display: inline-block"
											on:click={() => {
												if (product.inventory > 0) product.inventory -= 1
												updateProduct(product)
											}}
										>
											<MinusIcon size="16" />
										</div>
										<span
											style="display: inline-block"
											class="message left-align"
										>
											{product.inventory}
										</span>
										<div
											style="display: inline-block"
											on:click={() => {
												product.inventory += 1
												updateProduct(product)
											}}
										>
											<PlusIcon size="16" />
										</div>
									</td>
								</tr>
							</table>
						</tr>
					</table>
				</div>
			{/each}
		</div>
	{/if}
</template>

<style>
	.center {
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}
	.title {
		font-family: 'Poppins', sans-serif;
		font-size: 20px;
		font-weight: 600;
		margin: 0em;
	}
	.message {
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		font-weight: 400;
		margin: 0.2em;
	}
	.empty-list-message {
		display: block;
		width: 24em;
		word-wrap: break-word;
		margin-left: 1em;
	}
</style>
