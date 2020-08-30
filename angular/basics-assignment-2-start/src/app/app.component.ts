import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username='';
  isEmpty:boolean;

  emptyUsername(){
    this.isEmpty = this.username === '';
    return this.isEmpty;
  }
  resetUsername(){
    this.username='';
  }

}
