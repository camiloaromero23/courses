import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	// user = new BehaviorSubject<User>(null);
	// private API_KEY = environment.API_KEY;
	private tokenExpirationTimer: any;

	constructor(
		private http: HttpClient,
		private router: Router,
		private store: Store<fromApp.AppState>,
	) {}

	setLogoutTimer(expirationDuration: number) {
		this.tokenExpirationTimer = setTimeout(() => {
			this.store.dispatch(new AuthActions.Logout());
		}, expirationDuration);
	}

	clearLogoutTimer() {
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
			this.tokenExpirationTimer = null;
		}
	}

	// private static handleError(errorResponse: HttpErrorResponse) {
	// 	const errorMessage = 'Unknown error occurred';
	// 	if (!errorResponse.error || !errorResponse.error.error) {
	// 		return throwError(errorMessage);
	// 	}
	// 	return throwError(errorResponse.error.error);
	// }

	// signUp(email: string, password: string) {
	// 	const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
	// 	return this.http
	// 		.post<AuthResponseData>(url, {
	// 			email,
	// 			password,
	// 			returnSecureToken: true,
	// 		})
	// 		.pipe(
	// 			catchError(AuthService.handleError),
	// 			tap((responseData) =>
	// 				this.handleAuthentication(
	// 					responseData.email,
	// 					responseData.localId,
	// 					responseData.idToken,
	// 					+responseData.expiresIn,
	// 				),
	// 			),
	// 		);
	// }

	// login(email: string, password: string) {
	// 	const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
	// 	return this.http
	// 		.post<AuthResponseData>(url, {
	// 			email,
	// 			password,
	// 			returnSecureToken: true,
	// 		})
	// 		.pipe(
	// 			catchError(AuthService.handleError),
	// 			tap((responseData) =>
	// 				this.handleAuthentication(
	// 					responseData.email,
	// 					responseData.localId,
	// 					responseData.idToken,
	// 					+responseData.expiresIn,
	// 				),
	// 			),
	// 		);
	// }

	// logout() {
	// 	// this.user.next(null);
	//
	// 	// this.router.navigate(['/auth']).then();
	// 	localStorage.removeItem('userData');
	// 	if (this.tokenExpirationTimer) {
	// 		clearTimeout(this.tokenExpirationTimer);
	// 	}
	// 	this.tokenExpirationTimer = null;
	// }

	// autoLogin() {
	// 	const userData: {
	// 		email: string;
	// 		id: string;
	// 		_token: string;
	// 		_tokenExpirationDate: string;
	// 	} = JSON.parse(localStorage.getItem('userData'));
	// 	if (!userData) {
	// 		return;
	// 	}
	// 	const { email, id, _token, _tokenExpirationDate } = userData;
	// 	const loadedUser = new User(
	// 		email,
	// 		id,
	// 		_token,
	// 		new Date(_tokenExpirationDate),
	// 	);
	// 	if (loadedUser.token) {
	// 		// this.user.next(loadedUser);
	// 		this.store.dispatch(
	// 			new AuthActions.AuthenticateSuccess({
	// 				email: loadedUser.email,
	// 				userId: loadedUser.id,
	// 				token: loadedUser.token,
	// 				expirationDate: new Date(userData._tokenExpirationDate),
	// 			}),
	// 		);
	// 		const expirationDuration: number =
	// 			new Date(userData._tokenExpirationDate).getTime() -
	// 			new Date().getTime();
	// 		this.autoLogout(expirationDuration);
	// 	}
	// }

	// private handleAuthentication(
	// 	email: string,
	// 	userId: string,
	// 	token: string,
	// 	expiresIn: number,
	// ) {
	// 	const expirationDate = new Date(
	// 		new Date().getTime() + expiresIn * 1000,
	// 	);
	// 	const user = new User(email, userId, token, expirationDate);
	// 	// this.user.next(user);
	// 	this.store.dispatch(
	// 		new AuthActions.AuthenticateSuccess({
	// 			email,
	// 			userId,
	// 			token,
	// 			expirationDate,
	// 		}),
	// 	);
	// 	this.autoLogout(expiresIn * 1000);
	//
	// 	localStorage.setItem('userData', JSON.stringify(user));
	// }
}
