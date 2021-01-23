import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-offer-bookings',
    templateUrl: './offer-bookings.page.html',
    styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
    place: Place;
    private placeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private navController: NavController,
        private placesService: PlacesService,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.navController.navigateBack('/places/tabs/offers');
                return;
            }
            this.placeSubscription = this.placesService
                .getPlace(paramMap.get('placeId'))
                .subscribe((place) => {
                    this.place = place;
                });
        });
    }
    ngOnDestroy() {
        if (this.placeSubscription) {
            this.placeSubscription.unsubscribe();
        }
    }
}
