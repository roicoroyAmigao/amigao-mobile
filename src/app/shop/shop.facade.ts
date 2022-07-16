
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsState } from '../checkout/shared/store/forms.state';

export interface ICartStateModel {
    medusaFullCart: object;
    productsList: object;
}

@Injectable({
    providedIn: 'root'
})
export class CartFacade {
    @Select(FormsState.getFullCart) medusaFullCart: Observable<any>;
    @Select(FormsState.getMedusaProductsFromState) productsList: Observable<any>;
    // @Select(FormsState.) productsList: Observable<any>;

    /** View state that resolves once all data is ready or updated */
    readonly viewState$: Observable<ICartStateModel>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.medusaFullCart,
                this.productsList
            ]
        ).pipe(
            map((
                [
                    medusaFullCart,
                    productsList
                ]
            ) => (
                {
                    medusaFullCart,
                    productsList
                }
            ))
        );
    }
}
