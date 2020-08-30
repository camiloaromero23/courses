import { Component, OnDestroy, OnInit } from '@angular/core';
import Ingredient from '../../../shared/ingredient.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../../store/app.reducer';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	editSubscription: Subscription;
	shoppingForm: FormGroup;
	editMode = false;
	editedItem: Ingredient;

	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.initForm();
		this.editSubscription = this.store
			.select('shoppingList')
			.subscribe((stateData) => {
				if (stateData.editedIngredientIndex > -1) {
					this.editMode = true;
					this.editedItem = stateData.editedIngredient;
					const { name, amount } = this.editedItem;
					this.shoppingForm.setValue({ name, amount });
				} else {
					this.editMode = false;
				}
			});
		// this.editSubscription = this.shoppingListService.startedEditing.subscribe(
		// 	(index: number) => {
		// 		this.editMode = true;
		// 		this.editedItemIndex = index;
		// 		this.editedItem = this.shoppingListService.getIngredient(index);
		// 		console.log(this.editedItem);
		// 		const { name, amount } = this.editedItem;
		// 		this.shoppingForm.setValue({ name, amount });
		// 	},
		// );
	}

	ngOnDestroy() {
		this.editSubscription.unsubscribe();
		this.store.dispatch(new ShoppingListActions.StopEdit());
	}

	onSubmit() {
		const { name, amount } = this.shoppingForm.value;
		console.log(this.shoppingForm.value);
		const newIngredient = new Ingredient(name, amount);
		if (this.editMode) {
			this.store.dispatch(
				new ShoppingListActions.UpdateIngredient(newIngredient),
			);
			// this.shoppingListService.updateIngredient(
			// 	this.editedItemIndex,
			// 	newIngredient,
			// );
		} else {
			// this.shoppingListService.addIngredient(newIngredient);
			this.store.dispatch(
				new ShoppingListActions.AddIngredient(newIngredient),
			);
		}
		this.clearForm();
	}

	clearForm() {
		this.editMode = false;
		this.shoppingForm.reset();
		this.store.dispatch(new ShoppingListActions.StopEdit());
	}

	onDelete() {
		// this.shoppingListService.deleteIngredient(this.editedItemIndex);
		this.store.dispatch(new ShoppingListActions.DeleteIngredient());
		this.clearForm();
	}

	private initForm() {
		this.shoppingForm = new FormGroup({
			name: new FormControl(null, Validators.required),
			amount: new FormControl(null, [
				Validators.required,
				Validators.min(1),
			]),
		});
	}
}
