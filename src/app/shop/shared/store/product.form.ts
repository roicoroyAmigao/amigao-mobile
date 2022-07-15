/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-shadow */
import { Product } from 'src/app/checkout/shared/classes/product';

interface ProductStateModel {
    productForm: Product;
}

export const productFormState = (productFormState: ProductStateModel) => productFormState.productForm;

// export const isProductFormStateValid = (productFormState: ProductStateModel) => productFormState(productFormState).status === 'VALID';