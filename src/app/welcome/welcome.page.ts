import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../checkout/shared/services/navigation.service';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private navigation: NavigationService,
    protected authService: AuthService,
    protected router: Router,
  ) { }
  ngOnInit() {
  }
  goToCheckout(params) {
    this.navigation.navigateForwardParams('checkout', params);
  }
  goToShop() {
    this.navigation.navigateForward('shop/tabs/products-list');
  }
  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('login');
    });
  }
  profile() {
    this.router.navigateByUrl('profile');
  }
}
