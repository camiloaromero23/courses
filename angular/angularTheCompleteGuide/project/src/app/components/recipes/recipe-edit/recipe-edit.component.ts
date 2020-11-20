import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import Ingredient from '../../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	id: number;
	editMode = false;
	recipeForm: FormGroup;
	private storeSubscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private recipeService: RecipeService,
		private router: Router,
		private store: Store<fromApp.AppState>,
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params['id'] != null;
			this.initializeForm();
		});
	}

	private initializeForm() {
		let recipeName,
			recipeImagePath,
			recipeDescription = '';
		let recipeIngredients: FormArray = new FormArray([]);
		if (this.editMode) {
			// const recipe = this.recipeService.getRecipe(this.id);
			this.storeSubscription = this.store
				.select('recipes')
				.pipe(
					map((recipeState) => {
						return recipeState.recipes.find((recipe, index) => {
							return index === this.id;
						});
					}),
				)
				.subscribe((recipe) => {
					recipeName = recipe.name;
					recipeImagePath = recipe.imagePath;
					recipeDescription = recipe.description;
					if (recipe['ingredients']) {
						recipe.ingredients.forEach((ingredient: Ingredient) => {
							const { name, amount } = ingredient;
							recipeIngredients.push(
								new FormGroup({
									name: new FormControl(
										name,
										Validators.required,
									),
									amount: new FormControl(amount, [
										Validators.required,
										Validators.min(1),
									]),
								}),
							);
						});
					}
				});
		}
		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(recipeImagePath, Validators.required),
			description: new FormControl(
				recipeDescription,
				Validators.required,
			),
			ingredients: recipeIngredients,
		});
	}

	get controls() {
		// a getter!
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}

	onSubmit() {
		// console.log(this.recipeForm.value);
		const {
			name,
			imagePath,
			description,
			ingredients,
		} = this.recipeForm.value;
		const newRecipe = new Recipe(name, description, imagePath, ingredients);
		if (this.editMode) {
			// this.recipeService.updateRecipe(this.id, newRecipe);
			this.store.dispatch(
				new RecipesActions.UpdateRecipe({ index: this.id, newRecipe }),
			);
		} else {
			// this.recipeService.addRecipe(newRecipe);
			this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
		}
		this.router.navigate(['../'], { relativeTo: this.route }).then();
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(
			new FormGroup({
				name: new FormControl(null, Validators.required),
				amount: new FormControl(null, [
					Validators.required,
					Validators.min(1),
				]),
			}),
		);
	}

	onCancel() {
		this.router.navigate(['../'], { relativeTo: this.route }).then();
	}

	onDeleteIngredient(index) {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}

	ngOnDestroy(): void {
		if (this.storeSubscription) {
			this.storeSubscription.unsubscribe();
		}
	}
}
