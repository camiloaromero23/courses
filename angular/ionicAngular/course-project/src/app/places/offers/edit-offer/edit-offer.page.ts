import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    place: Place;
    form: FormGroup;
    private placeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private placesService: PlacesService,
        private navController: NavController,
        private router: Router,
        private loadingController: LoadingController,
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
                    this.form = new FormGroup({
                        title: new FormControl(this.place.title, {
                            updateOn: 'blur',
                            validators: [Validators.required],
                        }),
                        description: new FormControl(this.place.description, {
                            updateOn: 'blur',
                            validators: [
                                Validators.required,
                                Validators.maxLength(180),
                            ],
                        }),
                    });
                });
        });
    }

    onUpdateOffer() {
        if (this.form.invalid) {
            return;
        }
        console.log(this.form);
        this.loadingController
            .create({ message: 'Updating place...' })
            .then((loadingElement) => {
                loadingElement.present().then();
                this.placesService
                    .updatePlace(
                        this.place.id,
                        this.form.value.title,
                        this.form.value.description,
                    )
                    .subscribe(() => {
                        loadingElement.dismiss().then();
                        this.form.reset();
                        this.router.navigate(['/places/tabs/offers']).then();
                    });
            });
    }

    ngOnDestroy() {
        if (this.placeSubscription) {
            this.placeSubscription.unsubscribe();
        }
    }
}
