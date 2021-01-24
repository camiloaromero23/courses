import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    loadedPlaces: Place[];
    listedLoadedPlaces: Place[];
    relevantPlaces: Place[];
    isLoading = false;
    private placesSubscription: Subscription;

    constructor(
        private placesService: PlacesService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.placesSubscription = this.placesService.places.subscribe(
            (places) => {
                this.loadedPlaces = places;
                this.relevantPlaces = this.loadedPlaces;
                this.listedLoadedPlaces = this.loadedPlaces.slice(1);
            },
        );
    }

    ionViewWillEnter() {
        this.isLoading = true;
        this.placesService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
        });
    }

    onFilterUpdate($event: CustomEvent<SegmentChangeEventDetail>) {
        if ($event.detail.value === 'all') {
            this.relevantPlaces = this.loadedPlaces;
        } else {
            this.relevantPlaces = this.loadedPlaces.filter((place) => {
                return place.userId !== this.authService.userId;
            });
        }
        this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }

    ngOnDestroy() {
        if (this.placesSubscription) {
            this.placesSubscription.unsubscribe();
        }
    }
}
