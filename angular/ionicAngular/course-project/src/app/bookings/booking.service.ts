import { Injectable } from '@angular/core';
import { BookingModel } from './bookingModel';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';

interface BookingData {
    bookedFrom: string;
    bookedTo: string;
    firstName: string;
    guestNumber: number;
    lastName: string;
    placeId: string;
    placeImage: string;
    placeTitle: string;
    userId: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
    // tslint:disable-next-line:variable-name
    private _bookings = new BehaviorSubject<BookingModel[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }

    constructor(private authService: AuthService, private http: HttpClient) {}

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
        let generatedId: string;
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
        return this.http
            .post<{ name: string }>(`${URL}/bookings.json`, {
                ...newBooking,
                id: null,
            })
            .pipe(
                switchMap((resData) => {
                    generatedId = resData.name;
                    return this.bookings;
                }),
                take(1),
                tap((bookings: BookingModel[]) => {
                    newBooking.id = generatedId;
                    this._bookings.next([...bookings, newBooking]);
                }),
            );
    }

    cancelBooking(bookingId: string) {
        return this.http.delete(`${URL}/bookings/${bookingId}.json`).pipe(
            switchMap(() => {
                return this.bookings;
            }),
            take(1),
            tap((bookings) => {
                this._bookings.next(
                    bookings.filter((booking) => booking.id !== bookingId),
                );
            }),
        );
    }

    fetchBookings() {
        return this.http
            .get<{ [key: string]: BookingData[] }>(
                `${URL}/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`,
            )
            .pipe(
                map((bookingData) => {
                    const bookings = [];
                    for (const key in bookingData) {
                        if (bookingData.hasOwnProperty(key)) {
                            bookings.push(
                                new BookingModel(
                                    key,
                                    bookingData[key].placeId,
                                    bookingData[key].userId,
                                    bookingData[key].placeTitle,
                                    bookingData[key].placeImage,
                                    bookingData[key].firstName,
                                    bookingData[key].lastName,
                                    bookingData[key].guestNumber,
                                    new Date(bookingData[key].bookedFrom),
                                    new Date(bookingData[key].bookedTo),
                                ),
                            );
                        }
                    }
                    console.info(bookings);
                    return bookings;
                }),
                tap((bookings) => {
                    this._bookings.next(bookings);
                }),
            );
    }
}
