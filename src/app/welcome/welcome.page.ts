import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private navigation: NavigationService,
  ) { }
  ngOnInit() {
  }
  goToCheckout(params){
    this.navigation.navigateForwardParams('checkout', params);
  }
  goToShop(){
    this.navigation.navigateForward('shop/tabs/products-list');
  }
}
