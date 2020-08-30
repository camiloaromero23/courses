import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clicks: Array<Date> = [];
  showDetails = false;

  handleClick() {
    this.showDetails = !this.showDetails;
    this.clicks = [...this.clicks , new Date()];

  }

}
