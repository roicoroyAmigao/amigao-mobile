import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { slideAnimation } from '../animations/nav-animation';

export interface IInternalNavigationOptions {
    /** The soft URL to navigate to. */
    url: string;
    /** Additional queryParams. */
    queryParams?: any;
    /** If true apply slide up flow animation. */
    flowAnimation?: boolean;
    /**
     * Optional list of forward paths. If specified, after navigating to url will navigate forward through this list.
     * Used to handle back navigation flow.
     */
    forwardPaths?: string[];
}
@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    constructor(
        private navCtrl: NavController
    ) { }
    async navigateForward(url: string) {
        await this.navCtrl.navigateForward(url, {
            animation: slideAnimation,
            animated: true,
            animationDirection: 'forward'
        });
    }
    async navigateBack(url: string) {
        await this.navCtrl.navigateForward(url, {
            animation: slideAnimation,
            animated: true,
            animationDirection: 'back'
        });
    }
    async navigateForwardParams(url: string, params?) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                params,
            }
        };
        await this.navCtrl.navigateForward(url, {
            queryParams: navigationExtras,
            animation: slideAnimation,
            animated: true,
            animationDirection: 'forward'
        });
    }
    async navigatebackParams(url: string, params?) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                params,
            }
        };
        await this.navCtrl.navigateForward(url, {
            queryParams: navigationExtras,
            animation: slideAnimation,
            animated: true,
            animationDirection: 'back'
        });
    }
}
