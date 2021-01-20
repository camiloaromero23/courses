import { Component, OnInit } from '@angular/core';
import { BookingsService } from './bookings.service';
import { BookingsModel } from './bookings.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
    loadedBookings: BookingsModel[];
    constructor(private bookingsService: BookingsService) {}

    ngOnInit() {
        this.loadedBookings = this.bookingsService.bookings;
    }

    onCancelBooking(offerId: string, slidingElement: IonItemSliding) {
        slidingElement.close().then();
    }
}
