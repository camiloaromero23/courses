import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
    offers: Place[];
    private offersSubscription: Subscription;

    constructor(private placesService: PlacesService, private router: Router) {}

    ngOnInit() {
        this.offersSubscription = this.placesService.places.subscribe(
            (places) => {
                this.offers = places;
            },
        );
    }

    onEdit(offerId: string, slidingItem: IonItemSliding) {
        slidingItem.close().then();
        this.router
            .navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId])
            .then();
        console.log(`Editing item... ${offerId}`);
    }

    ngOnDestroy() {
        if (this.offersSubscription) {
            this.offersSubscription.unsubscribe();
        }
    }
}
