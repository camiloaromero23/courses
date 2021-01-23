import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ActionSheetController,
    LoadingController,
    ModalController,
    NavController,
} from '@ionic/angular';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from '../../../bookings/booking.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
    place: Place;
    isBookable = false;
    private placeSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private navController: NavController,
        private placesService: PlacesService,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
        private bookingService: BookingService,
        private loadingController: LoadingController,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.navController.navigateBack('/places/tabs/discover').then();
                return;
            }
            this.placeSubscription = this.placesService
                .getPlace(paramMap.get('placeId'))
                .subscribe((place) => {
                    this.place = place;
                    this.isBookable = place.userId !== this.authService.userId;
                });
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
                componentProps: {
                    selectedPlace: this.place,
                    selectedMode: mode,
                },
            })
            .then((modalElement) => {
                modalElement.present().then();
                return modalElement.onDidDismiss();
            })
            .then((resultData) => {
                console.info(resultData);
                if (resultData.role === 'confirm') {
                    this.loadingController
                        .create({ message: 'Booking place...' })
                        .then((loadingElement) => {
                            loadingElement.present().then();
                            const data = resultData.data.bookingData;
                            this.bookingService
                                .addBooking(
                                    this.place.id,
                                    this.place.title,
                                    this.place.imageUrl,
                                    data.firstName,
                                    data.lastName,
                                    +data.guestNumber,
                                    data.startDate,
                                    data.endDate,
                                )
                                .subscribe(() => {
                                    loadingElement.dismiss().then();
                                });
                            console.log('BOOKED');
                        });
                }
            });
    }

    ngOnDestroy() {
        if (this.placeSubscription) {
            this.placeSubscription.unsubscribe();
        }
    }
}
