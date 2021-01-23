import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    // tslint:disable-next-line:variable-name
    private _places = new BehaviorSubject<Place[]>([
        new Place(
            'p1',
            'Manhattan Mansion',
            'In the heart of New York City.',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            149.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
            'abc',
        ),
        new Place(
            'p2',
            'Place 2',
            'Description.',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            109.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
            'abc',
        ),
        new Place(
            'p3',
            'Place 3',
            'Description.',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            129.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
            'abc',
        ),
    ]);

    constructor(private authService: AuthService) {}

    get places() {
        return this._places.asObservable();
    }

    getPlace(id: string) {
        return this._places.pipe(
            take(1),
            map((places) => {
                return { ...places.find((place) => place.id === id) };
            }),
        );
    }

    addPlace(
        title: string,
        description: string,
        price: number,
        dateFrom: Date,
        dateTo: Date,
    ) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            price,
            dateFrom,
            dateTo,
            this.authService.userId,
        );
        return this._places.pipe(
            take(1),
            delay(1000),
            tap((places) => {
                this._places.next([...places, newPlace]);
            }),
        );
    }

    updatePlace(placeId: string, title: string, description: string) {
        return this._places.pipe(
            take(1),
            delay(1000),
            tap((places: Place[]) => {
                const updatePlaceIndex = places.findIndex(
                    (place) => place.id === placeId,
                );
                const updatedPlaces = [...places];
                const oldPlace = updatedPlaces[updatePlaceIndex];
                updatedPlaces[updatePlaceIndex] = new Place(
                    oldPlace.id,
                    title,
                    description,
                    oldPlace.imageUrl,
                    oldPlace.price,
                    oldPlace.availableFrom,
                    oldPlace.availableTo,
                    oldPlace.userId,
                );
                this._places.next(updatedPlaces);
            }),
        );
    }
}
