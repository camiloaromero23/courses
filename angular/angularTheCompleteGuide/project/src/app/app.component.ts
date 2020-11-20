import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './components/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './components/auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(
		private authService: AuthService,
		private store: Store,
		@Inject(PLATFORM_ID) private platformId,
	) {}
	ngOnInit(): void {
		// this.authService.autoLogin();
		if (isPlatformBrowser(this.platformId)) {
			this.store.dispatch(new AuthActions.AutoLogin());
		}
	}
}
