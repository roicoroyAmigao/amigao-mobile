import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  public selectedRegionId = new BehaviorSubject<any>([]);

  constructor() { }
}
