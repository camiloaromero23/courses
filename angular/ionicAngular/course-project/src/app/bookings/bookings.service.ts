import { Injectable } from '@angular/core';
import { BookingsModel } from './bookings.model';

@Injectable({ providedIn: 'root' })
export class BookingsService {
    // tslint:disable-next-line:variable-name
    private _bookings: BookingsModel[] = [
        {
            id: 'xyz',
            placeId: 'p1',
            placeTitle: 'Manhattan Mansion',
            guestNumber: 2,
            userId: 'abc',
        },
    ];

    get bookings() {
        return [...this._bookings];
    }
}
