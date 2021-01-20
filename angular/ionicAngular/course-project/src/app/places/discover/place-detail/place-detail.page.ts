import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ActionSheetController,
    ModalController,
    NavController,
} from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
    place: Place;

    constructor(
        private route: ActivatedRoute,
        private navController: NavController,
        private placesService: PlacesService,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.navController.navigateBack('/places/tabs/discover').then();
                return;
            }
            this.place = this.placesService.getPlace(paramMap.get('placeId'));
        });
    }

    onBookPlace() {
        // this.router.navigateByUrl('/places/tabs/discover');
        // this.navController.navigateBack('/places/tabs/discover');
        this.actionSheetController
            .create({
                header: 'Choose an Action',
                buttons: [
                    {
                        text: 'Select Date',
                        handler: () => {
                            this.openBookingModal('select');
                        },
                    },
                    {
                        text: 'Random Date',
                        handler: () => {
                            this.openBookingModal('random');
                        },
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                ],
            })
            .then((actionSheetElement) => {
                actionSheetElement.present().then();
            });
    }

    private openBookingModal(mode: 'select' | 'random') {
        console.log(mode);
        this.modalController
            .create({
                component: CreateBookingComponent,
                componentProps: { selectedPlace: this.place },
            })
            .then((modalElement) => {
                modalElement.present().then();
                return modalElement.onDidDismiss();
            })
            .then((resultData) => {
                console.info(resultData);
                if (resultData.role === 'confirm') {
                    console.log('BOOKED');
                }
            });
    }
}
