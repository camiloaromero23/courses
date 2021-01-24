import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';

/*
[
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
]
     */

interface PlaceData {
    availableFrom: string;
    availableTo: string;
    description: string;
    imageUrl: string;
    price: number;
    title: string;
    userId: string;
}

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    // tslint:disable-next-line:variable-name
    private _places = new BehaviorSubject<Place[]>([]);

    constructor(private authService: AuthService, private http: HttpClient) {}

    fetchPlaces() {
        return this.http
            .get<{ [key: string]: PlaceData }>(`${URL}/offered-places.json`)
            .pipe(
                map((resData) => {
                    const places = [];
                    for (const key in resData) {
                        if (resData.hasOwnProperty(key)) {
                            places.push(
                                new Place(
                                    key,
                                    resData[key].title,
                                    resData[key].description,
                                    resData[key].imageUrl,
                                    resData[key].price,
                                    new Date(resData[key].availableFrom),
                                    new Date(resData[key].availableTo),
                                    resData[key].userId,
                                ),
                            );
                        }
                    }
                    return places;
                }),
                tap((places) => {
                    this._places.next(places);
                }),
            );
    }

    get places() {
        return this._places.asObservable();
    }

    getPlace(id: string) {
        return this.http.get(`${URL}/offered-places/${id}.json`).pipe(
            map<PlaceData>((placeData) => {
                return new Place(
                    id,
                    placeData.title,
                    placeData.description,
                    placeData.imageUrl,
                    placeData.price,
                    new Date(placeData.availableFrom),
                    new Date(placeData.availableTo),
                    placeData.userId,
                );
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
        let generatedId: string;
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
        return this.http
            .post<{ name: string }>(`${URL}/offered-places.json`, {
                ...newPlace,
                id: null,
            })
            .pipe(
                // take(1),
                // tap((places) => {
                //     this._places.next([...places, newPlace]);
                // }),
                switchMap((resData) => {
                    generatedId = resData.name;
                    return this.places;
                }),
                take(1),
                tap((places) => {
                    newPlace.id = generatedId;
                    this._places.next([...places, newPlace]);
                }),
            );
        /*return this._places.pipe(
            take(1),
            delay(1000),
            tap((places) => {
                this._places.next([...places, newPlace]);
            }),
        );*/
    }

    updatePlace(placeId: string, title: string, description: string) {
        let updatedPlaces: Place[];
        return this.places.pipe(
            take(1),
            switchMap<Place[]>((places) => {
                if (!places || places.length <= 0) {
                    return this.fetchPlaces();
                } else {
                    return of(places);
                }
            }),
            switchMap<Place[]>((places) => {
                const updatedPlaceIndex = places.findIndex(
                    (place) => place.id === placeId,
                );
                updatedPlaces = [...places];
                const oldPlace = updatedPlaces[updatedPlaceIndex];
                updatedPlaces[updatedPlaceIndex] = new Place(
                    oldPlace.id,
                    title,
                    description,
                    oldPlace.imageUrl,
                    oldPlace.price,
                    oldPlace.availableFrom,
                    oldPlace.availableTo,
                    oldPlace.userId,
                );
                return this.http.put(`${URL}/offered-places/${placeId}.json`, {
                    ...updatedPlaces[updatedPlaceIndex],
                    id: null,
                });
            }),
            tap(() => {
                this._places.next(updatedPlaces);
            }),
        );
    }
}
