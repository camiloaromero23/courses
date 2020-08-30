import { Component, OnDestroy, OnInit } from '@angular/core';
import Ingredient from '../../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
	ingredients: Observable<{ ingredients: Ingredient[] }>;

	// private ingredientSubscription: Subscription;
	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.ingredients = this.store.select('shoppingList');
		// this.ingredients = this.shoppingListService.getIngredients();

		// this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe(
		// 	(ingredients: Ingredient[]) => {
		// 		this.ingredients = ingredients;
		// 	},
		// );
	}

	ngOnDestroy() {
		// this.ingredientSubscription.unsubscribe();
	}

	onEditItem(index: number) {
		this.store.dispatch(new ShoppingListActions.StartEdit(index));
		// this.shoppingListService.startedEditing.next(index);
	}
}
