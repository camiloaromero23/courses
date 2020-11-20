import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;

	constructor(
		private recipeService: RecipeService,
		private route: ActivatedRoute,
		private router: Router,
		private store: Store<fromApp.AppState>,
	) {}

	ngOnInit(): void {
		this.route.params
			.pipe(
				map((params) => {
					return +params['id'];
				}),
				switchMap((id) => {
					this.id = id;
					return this.store.select('recipes');
				}),
				map((recipeState) => {
					return recipeState.recipes.find((recipe, index) => {
						return index === this.id;
					});
				}),
			)
			.subscribe((recipe) => {
				this.recipe = recipe;
			});
	}

	onAddToShoppingList() {
		this.store.dispatch(
			new ShoppingListActions.AddIngredients(this.recipe.ingredients),
		);
		// this.recipeService.addIngredientsToShoppingList(
		// 	this.recipe.ingredients,
		// );
	}

	onEditRecipe() {
		this.router.navigate(['edit'], { relativeTo: this.route }).then();
	}

	onDeleteRecipe() {
		// this.recipeService.deleteRecipe(this.id);
		this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
		this.router.navigate(['/recipes']).then();
	}
}
