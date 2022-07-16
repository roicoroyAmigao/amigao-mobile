/* eslint-disable @typescript-eslint/member-ordering */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartQuantityService } from './cart-couter.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.scss'],
})
export class CartCounterComponent implements OnInit {


  @Input() min = 1;
  @Input() max = 10;
  @Input() step = 1;
  // @Input() appearance = 'none';
  @Input() color = 'primary';
  @Input() counterValue: number;
  @Input() readonly: boolean;
  @Output() counterChange: EventEmitter<number>;
  @Input()
  get counter() {
    return this.counterValue;
  }
  constructor(
    private productQuantityService: CartQuantityService
  ) { }

  ngOnInit() {
    this.counterValue = this.counterValue || this.min;
    this.productQuantityService.cartQuantity.next(this.counterValue);
    this.counterChange = new EventEmitter();
  }

  increment() {
    if (this.counterValue < this.max) {
      this.counterValue = this.counterValue + this.step;
      this.productQuantityService.cartQuantity.next(this.counterValue);
      this.counterChange.emit(this.counterValue);
    }
  }

  decrement() {
    if (this.counterValue > this.min) {
      this.counterValue = this.counterValue - this.step;
      this.productQuantityService.cartQuantity.next(this.counterValue);
      this.counterChange.emit(this.counterValue);
    }
  }
}
