import { Injectable } from '@angular/core';
import { BookingModel } from './bookingModel';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BookingService {
    // tslint:disable-next-line:variable-name
    private _bookings = new BehaviorSubject<BookingModel[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }

    constructor(private authService: AuthService) {}

    addBooking(
        placeId: string,
        placeTitle: string,
        placeImage: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date,
    ) {
        const newBooking = new BookingModel(
            Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImage,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo,
        );
        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap((bookings: BookingModel[]) => {
                this._bookings.next([...bookings, newBooking]);
            }),
        );
    }

    cancelBooking(bookingId: string) {
        return this.bookings.pipe(
            take(1),
            delay(1000),
            tap((bookings: BookingModel[]) => {
                this._bookings.next(
                    bookings.filter((booking) => {
                        return booking.id !== bookingId;
                    }),
                );
            }),
        );
    }
}
