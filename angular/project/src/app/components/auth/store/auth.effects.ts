import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: string;
}

const handleAuthentication = (
	expirationDate: Date,
	email: string,
	userId: string,
	token: string,
) => {
	const user = new User(email, userId, token, expirationDate);
	localStorage.setItem('userData', JSON.stringify(user));
	return new AuthActions.AuthenticateSuccess({
		email,
		userId,
		token,
		expirationDate,
		redirect: true,
	});
};
const handleError = (errorResponse) => {
	let errorMessage = 'Unknown error occurred';
	if (!errorResponse.error || !errorResponse.error.error) {
		return of(new AuthActions.AuthenticateFailure(errorMessage));
	}
	errorMessage = `Error ${errorResponse.error.error.code}: ${errorResponse.error.error.message}`;
	return of(new AuthActions.AuthenticateFailure(errorMessage));
};

@Injectable()
export class AuthEffects {
	@Effect()
	authLogin = this.actions$.pipe(
		ofType(AuthActions.LOGIN_START),
		switchMap((authData: AuthActions.LoginStart) => {
			const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`;
			return this.handleHttpRequest(authData, url);
		}),
	);

	@Effect({ dispatch: false })
	authRedirect = this.actions$.pipe(
		ofType(AuthActions.AUTHENTICATE_SUCCESS),
		tap((authSuccesAction: AuthActions.AuthenticateSuccess) => {
			if (authSuccesAction.payload.redirect) {
				this.router.navigate(['/']).then();
			}
		}),
	);

	@Effect()
	authSignUp = this.actions$.pipe(
		ofType(AuthActions.SIGNUP_START),
		switchMap((signUpAction: AuthActions.SignUpStart) => {
			const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`;
			return this.handleHttpRequest(signUpAction, url);
		}),
	);

	@Effect({ dispatch: false })
	authLogout = this.actions$.pipe(
		ofType(AuthActions.LOGOUT),
		// distinctUntilChanged(),
		tap(() => {
			this.authService.clearLogoutTimer();
			localStorage.removeItem('userData');
			this.router.navigate(['/auth']).then();
		}),
	);

	@Effect()
	autoLogin = this.actions$.pipe(
		ofType(AuthActions.AUTO_LOGIN),
		map(() => {
			const userData: {
				email: string;
				id: string;
				_token: string;
				_tokenExpirationDate: string;
			} = JSON.parse(localStorage.getItem('userData'));
			if (!userData) {
				return { type: 'NOT_ACTION' };
			}
			const { email, id, _token, _tokenExpirationDate } = userData;
			const loadedUser = new User(
				email,
				id,
				_token,
				new Date(_tokenExpirationDate),
			);
			if (loadedUser.token) {
				const expirationDuration: number =
					new Date(userData._tokenExpirationDate).getTime() -
					new Date().getTime();
				this.authService.setLogoutTimer(expirationDuration);
				return new AuthActions.AuthenticateSuccess({
					email: loadedUser.email,
					userId: loadedUser.id,
					token: loadedUser.token,
					expirationDate: new Date(userData._tokenExpirationDate),
					redirect: false,
				});
			}
			return { type: 'NOT_ACTION' };
		}),
	);

	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private router: Router,
		private authService: AuthService,
	) {}

	private handleHttpRequest(
		authData: AuthActions.LoginStart | AuthActions.SignUpStart,
		url: string,
	) {
		return this.http
			.post<AuthResponseData>(url, {
				email: authData.payload.email,
				password: authData.payload.password,
				returnSecureToken: true,
			})
			.pipe(
				tap((resData) => {
					console.log('TIMER', +resData.expiresIn);
					this.authService.setLogoutTimer(+resData.expiresIn * 1000);
				}),
				map((responseData) => {
					const { email, expiresIn } = responseData;
					const expirationDate = new Date(
						new Date().getTime() + +expiresIn * 1000,
					);
					const userId = responseData.localId;
					const token = responseData.idToken;
					return handleAuthentication(
						expirationDate,
						email,
						userId,
						token,
					);
				}),
				catchError((errorResponse) => {
					return handleError(errorResponse);
				}),
			);
	}
}
