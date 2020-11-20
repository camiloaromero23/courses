import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root' })
export class DataService{
  getDetails() {
    return new Promise((resolve => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    }));
  }
}
