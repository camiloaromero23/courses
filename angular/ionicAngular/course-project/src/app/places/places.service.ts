import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    private _places: Place[] = [
        new Place(
            'p1',
            'Manhattan Mansion',
            'In the heart of New York City.',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            149.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
        ),
        new Place(
            'p2',
            'Place 2',
            'Description.',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            109.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
        ),
        new Place(
            'p3',
            'Place 3',
            'Description.',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            129.99,
            new Date('2019-01-01'),
            new Date('2019-12-31'),
        ),
    ];

    get places() {
        return [...this._places];
    }

    getPlace(id: string) {
        return { ...this._places.find((place) => place.id === id) };
    }
    constructor() {}
}
