import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedIndex;
  public appPages = [
    { title: 'Welcome', url: '/welcome', icon: 'home' },
    { title: 'Checkout', url: '/checkout', icon: 'paper-plane' },
  ];

  constructor(
    public alertController: AlertController,
  ) { }

  ionViewWillEnter() {
  }
}
