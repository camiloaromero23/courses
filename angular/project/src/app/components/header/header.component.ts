import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	authenticated = false;
	private userSubscription: Subscription;

	constructor(
		private dataStorageService: DataStorageService,
		private authService: AuthService,
		private store: Store<fromApp.AppState>,
	) {}

	ngOnInit(): void {
		this.store
			.select('auth')
			.pipe(
				map((authState) => {
					return authState.user;
				}),
			)
			.subscribe((user) => {
				this.authenticated = !!user;
			});
	}

	ngOnDestroy() {
		if (this.userSubscription) {
			this.userSubscription.unsubscribe();
		}
	}

	onSaveData() {
		this.store.dispatch(new RecipeActions.StoreRecipes());
		// this.dataStorageService.storeRecipes();
	}

	onFetchData() {
		this.store.dispatch(new RecipeActions.FetchRecipes());
		// this.dataStorageService.fetchRecipes().subscribe();
	}

	onLogout() {
		console.log('On LOGOUT ****************');
		this.store.dispatch(new AuthActions.Logout());
		// this.authService.logout();
	}
}
