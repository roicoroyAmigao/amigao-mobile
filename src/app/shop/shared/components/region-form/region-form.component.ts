/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { regionFromValidator } from 'src/app/checkout/shared/services/region-form.validator';
import { FormsState } from 'src/app/checkout/shared/store/forms.state';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { ShopState } from '../../store/shop.state';
import { RegionService } from './region-service';

@Component({
  selector: 'afn-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css']
})
export class RegionFormComponent implements OnInit, OnDestroy {
  regionForm = this.fb.group(
    {
      region: this.fb.group({
        id: [null, [Validators.required]],
      }),
    },
    { validator: regionFromValidator }
  );

  submitted = false;
  regionsLoaded = false;
  accountLoaded = false;
  regionsList;
  selectedRegionId;
  medusaCartId;
  sub: Subscription;
  private subscription = new Subscription();
  cartId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: MedusaDataService,
    private store: Store,
    private regionService: RegionService,
    public popoverController: PopoverController
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.dataService.getMedusaRegions().subscribe((medusaReg: any) => {
        this.regionsList = medusaReg.regions;
      }),
    );
    this.subscription.add(
      this.regionForm
        .get('region')
        .valueChanges.pipe(take(1))
        .subscribe((selectedRegion: any) => {
          this.selectedRegionId = selectedRegion;
          // this.patchStateWithRegionId(selectedRegion.id);
          this.patchState(this.selectedRegionId);
          this.regionService.selectedRegionId.next(selectedRegion.id);
        }),
    );
  }

  async patchState(regionId) {
    //  this.store.dispatch);
  }
  async dismissPopOver(regionId) {
    await this.popoverController.dismiss({ data: regionId });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
