import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartQuantityService {

    public cartQuantity = new BehaviorSubject<any>([]);

    constructor() { }
}
