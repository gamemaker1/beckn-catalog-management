// source/types.ts
// This file contains type definitions for the project.

/**
 * An object representing the quantity of a product.
 */
export type Quantity = {
	magnitude: number
	unit:
		| 'milligram'
		| 'grams'
		| 'kilograms'
		| 'millilitres'
		| 'litres'
		| 'tons'
		| 'millimetres'
		| 'centimetres'
		| 'metres'
		| 'kilometres'
}

/**
 * An object representing the price of a product.
 */
export type Price = {
	amount: number
	// prettier-ignore
	currency: 'AED' | 'AFN' | 'ALL' | 'AMD' | 'ARS' | 'AUD' | 'AZN' | 'BAM' | 'BDT' | 'BGN' | 'BHD' | 'BIF' | 'BND' | 'BOB' | 'BRL' | 'BWP' | 'BYN' | 'BZD' | 'CAD' | 'CDF' | 'CHF' | 'CLP' | 'CNY' | 'COP' | 'CRC' | 'CVE' | 'CZK' | 'DJF' | 'DKK' | 'DOP' | 'DZD' | 'EEK' | 'EGP' | 'ERN' | 'ETB' | 'EUR' | 'GBP' | 'GEL' | 'GHS' | 'GNF' | 'GTQ' | 'HKD' | 'HNL' | 'HRK' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'IQD' | 'IRR' | 'ISK' | 'JMD' | 'JOD' | 'JPY' | 'KES' | 'KHR' | 'KMF' | 'KRW' | 'KWD' | 'KZT' | 'LBP' | 'LKR' | 'LTL' | 'LVL' | 'LYD' | 'MAD' | 'MDL' | 'MGA' | 'MKD' | 'MMK' | 'MOP' | 'MUR' | 'MXN' | 'MYR' | 'MZN' | 'NAD' | 'NGN' | 'NIO' | 'NOK' | 'NPR' | 'NZD' | 'OMR' | 'PAB' | 'PEN' | 'PHP' | 'PKR' | 'PLN' | 'PYG' | 'QAR' | 'RON' | 'RSD' | 'RUB' | 'RWF' | 'SAR' | 'SDG' | 'SEK' | 'SGD' | 'SOS' | 'SYP' | 'THB' | 'TND' | 'TOP' | 'TRY' | 'TTD' | 'TWD' | 'TZS' | 'UAH' | 'UGX' | 'USD' | 'UYU' | 'UZS' | 'VEF' | 'VND' | 'XAF' | 'XOF' | 'YER' | 'ZAR' | 'ZMK' | 'ZWL'
}

/**
 * The channel of buying the product.
 */
export type Channel = 'online' | 'offline'

/**
 * The mode of payment accepted by the store owner for that product.
 */
export type PaymentMode =
	| 'upi'
	| 'cash'
	| 'cheque'
	| 'demand-draft'
	| 'credit-card'
	| 'debit-card'
	| 'neft'

/**
 * An interface representing a category of products.
 */
export interface Category {
	/**
	 *  The unique category ID.
	 */
	id: string

	/**
	 *  The user-visible name of the category.
	 */
	name: string

	/**
	 *  The user-visible description of the category.
	 */
	description: string

	/**
	 *  URL to image depicting the category.
	 */
	image: string

	/**
	 *  A list of IDs of categories that are related to this one.
	 */
	relatedCategories: string[]
}

/**
 * An interface representing a product.
 */
export interface Product {
	/**
	 * The unique product ID.
	 */
	id: string

	/**
	 * The user-visible name of the product.
	 */
	name: string

	/**
	 * The user-visible description of the product.
	 */
	description: string

	/**
	 * URL to image depicting the product.
	 */
	image: string

	/**
	 * ID of the category this product belongs to.
	 */
	category: string

	/**
	 * Quantity of item sold (e.g., 500g of washing powder)
	 */
	quantity: Quantity

	/**
	 * Final price (including tax) that the buyer needs to pay for the item.
	 */
	price: Price

	/**
	 * Number of units currently in stock.
	 */
	inventory: number

	/**
	 * Channels of obtaining product: 'online' (home delivery) or 'offline' (pick up from store).
	 */
	channel: Channel[]

	/**
	 * Modes of payment accepted for the product.
	 */
	payment: PaymentMode[]

	/**
	 * A list of IDs of products that are related to this one.
	 */
	relatedProducts: string[]
}

/**
 * An interface representing a basic notification item.
 * TODO: Improve this by adding more fields (date, action, etc.)
 */
export interface Notification {
	title: string
	description: string
	action: {
		label: string
		url: string
	}
}
