/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { FormActions } from '../checkout/shared/store/actions';
import { MedusaDataService } from '../medusa-data.service';
import { RegionFormComponent } from './shared/components/region-form/region-form.component';

@Component({
  selector: 'shop-tabs',
  templateUrl: 'shop.page.html',
  styleUrls: ['shop.page.scss']
})
export class ShopPage {
  regionId: string;
  constructor(
    public popoverController: PopoverController,
    private dataService: MedusaDataService,
    private store: Store,
    private menu: MenuController,
  ) {
   }

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: RegionFormComponent,
      event: e
    });
    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data?.data != null || data?.data !== this.regionId) {
      this.regionId = `${data.data}`;
      console.log(this.regionId);
      this.patchStateWithRegionId(this.regionId);
      this.createMedusaCart(this.regionId);
    }
  }
  patchStateWithRegionId(regionId: string) {
    this.store.dispatch(new FormActions.PatchStateSelectedRegionId(regionId));
  }
  createMedusaCart(regionId: string) {
    this.store.dispatch(new FormActions.CreateCart(regionId));
  }
  closeCartMenu(menuId) {
    this.menu.toggle(menuId);
  }
}
