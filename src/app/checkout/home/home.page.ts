import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import * as FormsSelectors from '../../shared/store/forms.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  sub: Subscription;
  params;
  details = false;
  isDeliveryFormValid$: Observable<boolean>;
  isPaymentEnabled$: Observable<boolean>;
  segmentModel;
  segment = 0;
  constructor(
    private navCtrl: NavController,
    private store: Store,
    private route: ActivatedRoute,
    private navigation: NavigationService
  ) { }

  ngOnInit() {
    this.isDeliveryFormValid$ = this.store.select(FormsSelectors.isDeliveryFormValid);
    this.isPaymentEnabled$ = this.store.select(FormsSelectors.isPaymentEnabled);
    this.sub = this.route.queryParams.subscribe(params => {
      this.params = params.queryParams;
      console.log(this.params);
    });
  }
  async segmentChanged(ev: any) {
    // await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    // this.segment = await this.slider.getActiveIndex();
  }

  segmentChangedEvent(event) {
    console.log(this.segmentModel);

    console.log(event);
  }
  async welcomePage() {
    await this.navigation.navigateBack('/welcome');
  }
  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
}
