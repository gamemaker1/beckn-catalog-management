<script lang="ts">
	import MultiSelect from 'svelte-multiselect'

	import type { Product } from '../types'

	// The view state
	const view = {
		state: {
			product: {},
		},
	}

	// The options for several fields such as `payment`, `channel`, etc.
	const paymentOptions = [
		{
			label: 'UPI',
			value: 'upi',
		},
		{
			label: 'Cash',
			value: 'cash',
		},
		{
			label: 'Cheque',
			value: 'cheque',
		},
		{
			label: 'Demand Draft',
			value: 'demand-draft',
		},
		{
			label: 'Credit Card',
			value: 'credit-card',
		},
		{
			label: 'Debit Card',
			value: 'debit-card',
		},
		{
			label: 'Net Banking',
			value: 'neft',
		},
	]
	const channelOptions = [
		{
			label: 'Pick up from store',
			value: 'offline',
		},
		{
			label: 'Home delivery',
			value: 'online',
		},
	]
	const quantityUnitOptions = [
		'milligram',
		'grams',
		'kilograms',
		'millilitres',
		'litres',
		'tons',
		'millimetres',
		'centimetres',
		'metres',
		'kilometres',
	]
	// prettier-ignore
	const priceCurrencyOptions = [{"label": "Afgaanse afgani (؋)","value": "AFN"},{"label": "Albanese lek (Lek)","value": "ALL"},{"label": "Algeriese dinar (د.ج.‏)","value": "DZD"},{"label": "Amerikaanse dollar ($)","value": "USD"},{"label": "Argentynse peso ($)","value": "ARS"},{"label": "Armeense dram (դր.)","value": "AMD"},{"label": "Australiese dollar ($)","value": "AUD"},{"label": "Azerbeidjaanse manat (ман.)","value": "AZN"},{"label": "Bahreinse dinar (د.ب.‏)","value": "BHD"},{"label": "Bangladesjiese taka (৳)","value": "BDT"},{"label": "Beliziese dollar ($)","value": "BZD"},{"label": "Belo-Russiese roebel (руб.)","value": "BYN"},{"label": "Boliviaanse boliviano (Bs)","value": "BOB"},{"label": "Bosnies-Herzegowiniese omskakelbare marka (KM)","value": "BAM"},{"label": "Botswana pula (P)","value": "BWP"},{"label": "Brasilliaanse reaal (R$)","value": "BRL"},{"label": "Britse pond (£)","value": "GBP"},{"label": "Broeneise dollar ($)","value": "BND"},{"label": "Bulgaarse lev (лв.)","value": "BGN"},{"label": "Burundiese frank (FBu)","value": "BIF"},{"label": "CFA frank BCEAO (CFA)","value": "XOF"},{"label": "CFA frank BEAC (FCFA)","value": "XAF"},{"label": "Chileense peso ($)","value": "CLP"},{"label": "Colombiaanse peso ($)","value": "COP"},{"label": "Comoraanse frank (FC)","value": "KMF"},{"label": "Costa Ricaanse colón (₡)","value": "CRC"},{"label": "Deense kroon (kr)","value": "DKK"},{"label": "Djiboeti frank (Fdj)","value": "DJF"},{"label": "Dominikaanse peso (RD$)","value": "DOP"},{"label": "Egiptiese pond (ج.م.‏)","value": "EGP"},{"label": "Eritrese nakfa (Nfk)","value": "ERN"},{"label": "Estonian Kroon (kr)","value": "EEK"},{"label": "Etiopiese birr (Br)","value": "ETB"},{"label": "Euro (€)","value": "EUR"},{"label": "Filippynse peso (₱)","value": "PHP"},{"label": "Georgiese lari (GEL)","value": "GEL"},{"label": "Ghanese cedi (GH₵)","value": "GHS"},{"label": "Guatemalaanse quetzal (Q)","value": "GTQ"},{"label": "Guinese frank (FG)","value": "GNF"},{"label": "Hondurese lempira (L)","value": "HNL"},{"label": "Hong Kong dollar ($)","value": "HKD"},{"label": "Hongaarse florint (Ft)","value": "HUF"},{"label": "Indian rupee (₹)","value": "INR"},{"label": "Indonesiese roepia (Rp)","value": "IDR"},{"label": "Irakse dinar (د.ع.‏)","value": "IQD"},{"label": "Iranse rial (﷼)","value": "IRR"},{"label": "Israeliese nuwe sikkel (₪)","value": "ILS"},{"label": "Jamaikaanse dollar ($)","value": "JMD"},{"label": "Japannese jen (￥)","value": "JPY"},{"label": "Jemenitiese rial (ر.ي.‏)","value": "YER"},{"label": "Jordaniese dinar (د.أ.‏)","value": "JOD"},{"label": "Kaap Verdiese escudo (CV$)","value": "CVE"},{"label": "Kambodjaanse riel (៛)","value": "KHR"},{"label": "Kanadese dollar ($)","value": "CAD"},{"label": "Katarrese rial (ر.ق.‏)","value": "QAR"},{"label": "Kazakse tenge (тңг.)","value": "KZT"},{"label": "Keniaanse sjieling (Ksh)","value": "KES"},{"label": "Koeweitse dinar (د.ك.‏)","value": "KWD"},{"label": "Kongolese frank (FrCD)","value": "CDF"},{"label": "Kroatiese kuna (kn)","value": "HRK"},{"label": "Lebanese pond (ل.ل.‏)","value": "LBP"},{"label": "Lettiese lats (Ls)","value": "LVL"},{"label": "Libiese dinar (د.ل.‏)","value": "LYD"},{"label": "Litause litas (Lt)","value": "LTL"},{"label": "Macaose pataca (MOP$)","value": "MOP"},{"label": "Macedoniese denar (MKD)","value": "MKD"},{"label": "Maleisiese ringgit (RM)","value": "MYR"},{"label": "Malgassiese ariary (MGA)","value": "MGA"},{"label": "Marokkaanse dirham (د.م.‏)","value": "MAD"},{"label": "Mauritiaanse rupee (MURs)","value": "MUR"},{"label": "Meksikaanse peso ($)","value": "MXN"},{"label": "Mianmese kyat (K)","value": "MMK"},{"label": "Moldowiese leu (MDL)","value": "MDL"},{"label": "Mosambiekse metical (MTn)","value": "MZN"},{"label": "Namibiese dollar (N$)","value": "NAD"},{"label": "Nepalese roepee (नेरू)","value": "NPR"},{"label": "Nicaraguaanse córdoba (C$)","value": "NIO"},{"label": "Nieu-Seeland dollar ($)","value": "NZD"},{"label": "Nigeriese naira (₦)","value": "NGN"},{"label": "Noorse kroon (kr)","value": "NOK"},{"label": "Nuwe Taiwanese dollar (NT$)","value": "TWD"},{"label": "Oekraïnse hriwna (₴)","value": "UAH"},{"label": "Oezbekiese som (UZS)","value": "UZS"},{"label": "Omaanse rial (ر.ع.‏)","value": "OMR"},{"label": "Pakistanse roepee (₨)","value": "PKR"},{"label": "Panamese balboa (B/.)","value": "PAB"},{"label": "Paraguaanse guarani (₲)","value": "PYG"},{"label": "Peruaanse sol (S/.)","value": "PEN"},{"label": "Poolse zloty (zł)","value": "PLN"},{"label": "Roemeense leu (RON)","value": "RON"},{"label": "Russiese roebel (₽.)","value": "RUB"},{"label": "Rwandiese frank (FR)","value": "RWF"},{"label": "Saoedi-Arabiese riyal (ر.س.‏)","value": "SAR"},{"label": "Serbiese dinar (дин.)","value": "RSD"},{"label": "Singapoer dollar ($)","value": "SGD"},{"label": "Siriese pond (ل.س.‏)","value": "SYP"},{"label": "Sjinese joean renminbi (CN¥)","value": "CNY"},{"label": "Soedannese pond (SDG)","value": "SDG"},{"label": "Somaliese sjieling (Ssh)","value": "SOS"},{"label": "Sri Lankaanse roepee (SL Re)","value": "LKR"},{"label": "Suid-Afrikaanse rand (R)","value": "ZAR"},{"label": "Suid-Koreaanse won (₩)","value": "KRW"},{"label": "Sweedse kroon (kr)","value": "SEK"},{"label": "Switserse frank (CHF)","value": "CHF"},{"label": "Tanzaniese sjieling (TSh)","value": "TZS"},{"label": "Thaise baht (฿)","value": "THB"},{"label": "Tongaanse pa’anga (T$)","value": "TOP"},{"label": "Trinidad en Tobago dollar ($)","value": "TTD"},{"label": "Tsjeggiese kroon (Kč)","value": "CZK"},{"label": "Tunisiese dinar (د.ت.‏)","value": "TND"},{"label": "Turkse lier (TL)","value": "TRY"},{"label": "Ugandese sjieling (USh)","value": "UGX"},{"label": "Uruguaanse peso ($)","value": "UYU"},{"label": "Venezolaanse bolivar (Bs.F.)","value": "VEF"},{"label": "Verenigde Arabiese Emirate dirham (د.إ.‏)","value": "AED"},{"label": "Viëtnamese dong (₫)","value": "VND"},{"label": "Yslandse kroon (kr)","value": "ISK"},{"label": "Zambiese kwacha (ZK)","value": "ZMK"},{"label": "Zimbabwean Dollar (ZWL$)","value": "ZWL"}]

	/**
	 * A skeleton object that allows the app to prefill values that it might already
	 * know.
	 */
	export let skeleton: Product | Partial<Product> = {}

	/**
	 * The categories the user must select from.
	 */
	export let categories: Category[] = []

	/**
	 * Callback fired when the user hits 'Create Product'.
	 *
	 * @param {Product} product - The product to add to the crowdsourced catalog.
	 */
	export let onSave: (product: Product) => void = () => {}

	view.state.product = {
		id: '',
		name: '',
		description: '',
		image: undefined,
		category: '',
		quantity: {
			magnitude: 0,
			unit: '',
		},
		price: {
			amount: 0,
			currency: 'INR',
		},
		inventory: 0,
		payment: [],
		channel: [],
		relatedProducts: [],
		...skeleton,
	}
</script>

<template>
	<!-- Each input field has its own box -->
	<!-- TODO: Allow voice input -->
	<table id="content" style="display: block; text-align: center">
		<tr>
			<label for="product-name-input">Name</label>
			<input
				id="product-name-input"
				type="text"
				bind:value={view.state.product.name}
			/>
		</tr>
		<tr>
			<label for="product-desc-input">Description</label>
			<input
				id="product-desc-input"
				type="text"
				bind:value={view.state.product.description}
			/>
		</tr>
		<tr>
			<label for="product-category-input">Category</label>
			<MultiSelect
				id="product-category-input"
				on:add={(event) =>
					(view.state.product.category = event.detail.option.value)}
				options={categories.map((category) => {
					return { label: category.name, value: category.id }
				})}
				maxSelect={1}
				style="max-width: 20em;"
			/>
		</tr>
		<tr>
			<label for="product-price-input">Price</label>
		</tr>
		<tr>
			<td>
				<input
					id="product-price-input"
					type="number"
					bind:value={view.state.product.price.amount}
				/>
				<!--<MultiSelect 
					style="width: 50%"
					id="product-price-currency-input"
					on:add={(event) =>
						(view.state.product.price.currency = event.detail.option.value)}
					options={priceCurrencyOptions}
					maxSelect={1}
				/>-->
			</td>
		</tr>
		<tr>
			<label for="product-quantity-input">Quantity (in grams/litres)</label>
		</tr>
		<tr style="width: 50%">
			<td>
				<input
					id="product-quantity-input"
					type="number"
					bind:value={view.state.product.quantity.magnitude}
				/>
				<!--<MultiSelect
					id="product-quantity-unit-input"
					on:add={(event) =>
						(view.state.product.quantity.unit = event.detail.option.value)}
					options={quantityUnitOptions}
					maxSelect={1}
				/>-->
			</td>
		</tr>
		<tr>
			<label for="product-stock-input">Available Inventory</label>
			<input
				id="product-stock-input"
				type="number"
				bind:value={view.state.product.inventory}
			/>
		</tr>
		<tr>
			<label for="product-channel-input">Delivery Mode</label>
			<MultiSelect
				id="product-channel-input"
				on:add={(event) =>
					view.state.product.channel.push(event.detail.option.value)}
				options={channelOptions}
			/>
		</tr>
		<tr>
			<label for="product-payment-input">Payment</label>
			<MultiSelect
				id="product-payment-input"
				on:add={(event) =>
					view.state.product.payment.push(event.detail.option.value)}
				options={paymentOptions}
			/>
		</tr>
		<tr>
			<label for="product-image-input">Upload Image</label>
			<input
				id="product-image-input"
				type="file"
				accept="image/*"
				capture="environment"
				on:change={(event) => {
					const files = event.target.files
					let selectedFile

					for (const file of files) {
						if (file.type.match(/^image\//)) {
							selectedFile = file
							break
						}
					}

					if (selectedFile)
						view.state.product.image = URL.createObjectURL(selectedFile)
				}}
			/>
		</tr>
		<tr>
			<button on:click={() => onSave(view.state.product)}>
				<span>Create Product</span>
			</button>
		</tr>
	</table>
</template>

<style>
	table {
		max-width: 50%;
	}

	input {
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		width: 100%;
		padding: 0.1em;
		box-sizing: border-box;
		border: 1px solid #6b7589;
		border-radius: 0.5em;
		transition: all 150ms ease;
		background: #ffffff;
	}

	input:focus {
		outline: none;
		box-shadow: 0 0 0 0.1em #a4abb8;
		border-color: #6b7589;
	}

	button {
		display: block;
		font-family: 'Poppins', sans-serif;
		font-size: 14px;
		max-width: 20em;
		width: 100%;
		color: #fff;
		background-color: #6b7589;
		outline: none;
		border: none;
		border-radius: 0.5em;
		transition: all 150ms ease;
		cursor: pointer;
		padding: 1em;
		margin: 0.7em;
		margin-left: 0.1em;
	}

	label {
		display: block;
		text-align: left;
		color: #1f2633;
		font-weight: 600;
		font-size: 14px;
	}
</style>
