import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../places/place.model';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
    @Input() selectedPlace: Place;
    @Input() selectedMode: 'select' | 'random';
    startDate: string;
    endDate: string;
    bookingForm: FormGroup;

    constructor(private modalController: ModalController) {}

    ngOnInit() {
        if (this.selectedMode === 'random') {
            const availableFrom = new Date(this.selectedPlace.availableFrom);
            const availableTo = new Date(this.selectedPlace.availableTo);
            this.startDate = new Date(
                availableFrom.getTime() +
                    Math.random() *
                        (availableTo.getTime() -
                            7 * 24 * 3600 * 1000 -
                            availableFrom.getTime()),
            ).toISOString();
            this.endDate = new Date(
                new Date(this.startDate).getTime() +
                    Math.random() *
                        (new Date(this.startDate).getTime() +
                            6 * 24 * 3600 * 1000 -
                            new Date(this.startDate).getTime()),
            ).toISOString();
        }
        this.initBookingForm();
    }

    private initBookingForm() {
        this.bookingForm = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            guestNumber: new FormControl('2', [Validators.required]),
            dateFrom: new FormControl(this.startDate ? this.startDate : null, [
                Validators.required,
            ]),
            dateTo: new FormControl(this.endDate ? this.endDate : null, [
                Validators.required,
            ]),
        });
        console.log(this.bookingForm.value);
    }

    onCancel() {
        this.modalController.dismiss(null, 'cancel').then();
    }

    onBookPlace() {
        if (this.bookingForm.invalid) {
            return;
        }
        this.modalController
            .dismiss(
                {
                    bookingData: {
                        ...this.bookingForm.value,
                        startDate: this.bookingForm.value.startDate,
                        endDate: this.bookingForm.value.endDate,
                    },
                },
                'confirm',
            )
            .then();
    }
}
