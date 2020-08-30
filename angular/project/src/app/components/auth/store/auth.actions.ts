import { Action } from '@ngrx/store';

export const AUTHENTICATE_SUCCESS = '[Auth] Log In';
export const LOGIN_START = '[Auth] Log In Start';
export const AUTHENTICATE_FAILURE = '[Auth] Log In Fail';
export const AUTO_LOGIN = '[Auth] Auto Log In';
export const LOGOUT = '[Auth] Log Out';
export const SIGNUP = '[Auth] Sign Up';
export const SIGNUP_START = '[Auth] Sign Up Start';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class AuthenticateSuccess implements Action {
	readonly type = AUTHENTICATE_SUCCESS;

	constructor(
		public payload: {
			email: string;
			userId: string;
			token: string;
			expirationDate: Date;
			redirect: boolean;
		},
	) {}
}

export class Logout implements Action {
	readonly type = LOGOUT;
}

export class LoginStart implements Action {
	readonly type = LOGIN_START;

	constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFailure implements Action {
	readonly type = AUTHENTICATE_FAILURE;

	constructor(public payload: string) {}
}

export class SignUp implements Action {
	readonly type = SIGNUP;

	constructor(
		public payload: {
			email: string;
			userId: string;
		},
	) {}
}

export class SignUpStart implements Action {
	readonly type = SIGNUP_START;

	constructor(public payload: { email: string; password: string }) {}
}
export class ClearError implements Action {
	readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
	readonly type = AUTO_LOGIN;
}

export type AuthActions =
	| AuthenticateSuccess
	| Logout
	| LoginStart
	| AuthenticateFailure
	| SignUp
	| SignUpStart
	| ClearError
	| AutoLogin;
