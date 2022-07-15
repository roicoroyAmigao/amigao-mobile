import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { CartItem } from 'src/app/checkout/shared/classes/cart-item';
import { Product } from 'src/app/checkout/shared/classes/product';

@Injectable({
	providedIn: 'root'
})

export class CartService {

	public cartItems: CartItem[] = [];
	public cartStream: Subject<any> = new BehaviorSubject([]);
	public qtyTotal: Subject<number> = new BehaviorSubject(0);
	public priceTotal: Subject<number> = new BehaviorSubject(0);

	constructor(
		private store: Store
	) { }

	addVariantToCart(cartId, variantId, qty) {
	}
	removeFromCart(product: CartItem) {
		// this.store.dispatch(new RemoveFromCartAction({ product }));
	}
	updateFullCart(cartItems: CartItem[]) {
		// this.store.dispatch(new UpdateCartAction({ cartItems }));
		// this.toastrService.success('Cart Updated.');
	}
	increaseCartVariantQuantity(cartId, variantId, qty) {

	}
	decreaseCartVariantQuantity(cartId, variantId, qty) {

	}
	// Check whether product is in Cart or not
	isInCart(product: Product): boolean {
		return this.cartItems.find(item => item.id === product.id) ? true : false;
	}

}
