import {
	Component,
	ComponentFactoryResolver,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
	authForm: FormGroup;
	onLoginMode = true;
	isLoading = false;
	error: string = null;
	@ViewChild(PlaceholderDirective, { static: false })
	hostAlert: PlaceholderDirective;
	private componentSubscription: Subscription;
	private storeSubscription: Subscription;

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver,
		private store: Store<fromApp.AppState>,
	) {}

	ngOnInit(): void {
		this.initForm();
		this.storeSubscription = this.store
			.select('auth')
			.subscribe((authState) => {
				this.isLoading = authState.loading;
				this.error = authState.authError;
				if (this.error) {
					this.showErrorAlert(this.error);
				}
			});
	}

	onSwitchMode() {
		this.onLoginMode = !this.onLoginMode;
	}

	onSubmit() {
		if (!this.authForm.valid) return;
		const { email, password } = this.authForm.value;
		// this.isLoading = true;
		// let authObservable: Observable<AuthResponseData>;
		if (this.onLoginMode) {
			// authObservable = this.authService.login(email, password);
			// this.authService.login(email, password);
			this.store.dispatch(
				new AuthActions.LoginStart({ email, password }),
			);
		} else {
			this.store.dispatch(
				new AuthActions.SignUpStart({ email, password }),
			);
			// authObservable = this.authService.signUp(email, password);
		}

		// authObservable.subscribe(
		// 	(resData) => {
		// 		this.isLoading = false;
		// 		this.router.navigate(['/recipes']).then();
		// 	},
		// 	(errorResponse) => {
		// 		const errorMessage = `Error ${errorResponse.code}: ${errorResponse.message}`;
		// 		this.error = errorMessage;
		// 		this.showErrorAlert(errorMessage);
		// 		this.isLoading = false;
		// 	},
		// );

		this.authForm.reset();
	}

	onHandleError() {
		this.store.dispatch(new AuthActions.ClearError());
	}

	ngOnDestroy() {
		if (this.componentSubscription) {
			this.componentSubscription.unsubscribe();
		}
		if (this.storeSubscription) {
			this.storeSubscription.unsubscribe();
		}
	}

	private initForm() {
		this.authForm = new FormGroup({
			email: new FormControl('test@test.com', [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl('123456', [
				Validators.required,
				Validators.min(6),
			]),
		});
	}

	private showErrorAlert(message: string) {
		const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
			AlertComponent,
		);
		const hostViewContainerRef = this.hostAlert.viewContainerRef;
		hostViewContainerRef.clear();
		const componentRef = hostViewContainerRef.createComponent(
			alertComponentFactory,
		);
		componentRef.instance.message = message;
		this.componentSubscription = componentRef.instance.close.subscribe(
			() => {
				this.componentSubscription.unsubscribe();
				hostViewContainerRef.clear();
			},
		);
	}
}
