/* eslint-disable @typescript-eslint/naming-convention */
// export interface Product {
// 	id?: number;
// 	name?: string;
// 	slug?: string;
// 	price?: number;
// 	sale_price?: number;
// 	review?: number;
// 	ratings?: number;
// 	until?: string;
// 	stock?: number;
// 	top?: boolean;
// 	featured?: boolean;
// 	new?: boolean;
// 	short_desc?: boolean;
// 	category?: Array<{
// 		name?: string;
// 		slug?: string;
// 	}>;
// 	pictures?: Array<{
// 		width?: number;
// 		height?: number;
// 		url: number;
// 	}>;
// 	sm_pictures?: Array<{
// 		width?: number;
// 		height?: number;
// 		url?: number;
// 	}>;
// 	variants?: Array<{
// 		color?: string;
// 		color_name?: string;
// 		price?: number;
// 		size?: Array<{
// 			name?: string;
// 		}>;
// 	}>;
// }



export interface Root {
	product: Product;
  }

  export interface Product {
	id: string;
	title: string;
	subtitle: any;
	description: string;
	handle: string;
	is_giftcard: boolean;
	images: any[];
	thumbnail: any;
	options: Option[];
	variants: Variant[];
	profile_id: string;
	weight: any;
	length: any;
	height: any;
	width: any;
	hs_code: any;
	origin_country: any;
	mid_code: any;
	material: any;
	collection_id: string;
	collection: Collection;
	type_id: string;
	type: Type;
	tags: Tag[];
	created_at: string;
	updated_at: string;
	metadata: any;
  }

  export interface Option {
	id: string;
	title: string;
	product_id: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	metadata: any;
  }

  export interface Variant {
	id: string;
	title: string;
	product_id: string;
	product: Product2;
	prices: Price[];
	sku: any;
	barcode: any;
	ean: any;
	upc: any;
	inventory_quantity: number;
	allow_backorder: boolean;
	manage_inventory: boolean;
	hs_code: any;
	origin_country: any;
	mid_code: any;
	material: any;
	weight: any;
	length: any;
	height: any;
	width: any;
	options: Option2[];
	created_at: string;
	updated_at: string;
	deleted_at: any;
	metadata: any;
  }

  export interface Product2 {
	id: string;
	title: string;
	subtitle: any;
	description: string;
	handle: string;
	is_giftcard: boolean;
	thumbnail: any;
	profile_id: string;
	weight: any;
	length: any;
	height: any;
	width: any;
	hs_code: any;
	origin_country: any;
	mid_code: any;
	material: any;
	collection_id: string;
	type_id: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	metadata: any;
  }

  export interface Price {
	id: string;
	currency_code: string;
	amount: number;
	sale_amount: any;
	variant_id: string;
	region_id: any;
	created_at: string;
	updated_at: string;
	deleted_at: any;
  }

  export interface Option2 {
	id: string;
	value: string;
	option_id: string;
	variant_id: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	metadata: any;
  }

  export interface Collection {
	id: string;
	title: string;
	handle: any;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	metadata: any;
  }

  export interface Type {
	id: string;
	value: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	metadata: any;
  }

  export interface Tag {
	id: string;
	value: string;
	created_at: string;
	updated_at: string;
	deleted_at: any;
	metadata: any;
  }

