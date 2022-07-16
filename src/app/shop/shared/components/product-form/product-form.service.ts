import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFormService {

  public selectedProductedCartItem = new BehaviorSubject<any>([]);

  constructor() { }
}
