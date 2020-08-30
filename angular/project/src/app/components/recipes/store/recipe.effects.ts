import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';

@Injectable()
export class RecipeEffects {
	private url =
		'https://angular-recipe-book-7a0a2.firebaseio.com/recipes.json';

	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private store: Store<fromApp.AppState>,
	) {}

	@Effect()
	fetchRecipes = this.actions$.pipe(
		ofType(RecipesActions.FETCH_RECIPES),
		switchMap(() => {
			return this.http.get<Recipe[]>(this.url);
		}),
		map((recipes) => {
			console.log(recipes);
			return new RecipesActions.SetRecipes(recipes);
		}),
	);

	@Effect({ dispatch: false })
	storeRecipes = this.actions$.pipe(
		ofType(RecipesActions.STORE_RECIPES),
		withLatestFrom(this.store.select('recipes')),
		switchMap(([actionData, recipesState]) => {
			return this.http.put(this.url, recipesState.recipes);
		}),
	);
}
