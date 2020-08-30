import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../components/recipes/recipe.service';
import { Recipe } from '../components/recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../components/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../components/recipes/store/recipe.actions';

@Injectable({
	providedIn: 'root',
})
export class DataStorageService {
	private url =
		'https://angular-recipe-book-7a0a2.firebaseio.com/recipes.json';
	constructor(
		private http: HttpClient,
		private recipeService: RecipeService,
		private authService: AuthService,
		private store: Store<fromApp.AppState>,
	) {}

	storeRecipes() {
		const recipes = this.recipeService.getRecipes();
		this.http.put(this.url, recipes).subscribe(console.log);
	}

	fetchRecipes() {
		return this.http.get<Recipe[]>(this.url).pipe(
			map((recipes) => {
				return recipes.map((recipe) => {
					return {
						...recipe,
						ingredients: recipe.ingredients
							? recipe.ingredients
							: [],
					};
				});
			}),
			tap((recipes) => {
				this.store.dispatch(new RecipesActions.SetRecipes(recipes));
				// this.recipeService.setRecipes(recipes);
			}),
		);
	}
}
