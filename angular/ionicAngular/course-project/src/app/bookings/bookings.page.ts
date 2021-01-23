import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { BookingModel } from './bookingModel';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
    loadedBookings: BookingModel[];
    bookingSubscription: Subscription;

    constructor(
        private bookingsService: BookingService,
        private loadingController: LoadingController,
    ) {}

    ngOnInit() {
        this.bookingSubscription = this.bookingsService.bookings.subscribe(
            (bookings) => {
                this.loadedBookings = bookings;
            },
        );
    }

    onCancelBooking(bookingId: string, slidingElement: IonItemSliding) {
        slidingElement.close().then();
        this.loadingController
            .create({ message: 'Cancelling...' })
            .then((loadingElement) => {
                loadingElement.present().then();
                this.bookingsService.cancelBooking(bookingId).subscribe(() => {
                    loadingElement.dismiss().then();
                });
            });
    }

    ngOnDestroy() {
        if (this.bookingSubscription) {
            this.bookingSubscription.unsubscribe();
        }
    }
}
