import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
	recipeSubscription: Subscription;
	recipes: Recipe[];

	constructor(
		private recipeService: RecipeService,
		private router: Router,
		private route: ActivatedRoute,
		private store: Store<fromApp.AppState>,
	) {}

	ngOnInit(): void {
		this.recipeSubscription = this.store
			.select('recipes')
			.pipe(map((recipeState) => recipeState.recipes))
			.subscribe((recipes: Recipe[]) => {
				this.recipes = recipes;
			});
		// this.recipes = this.recipeService.getRecipes();
	}

	ngOnDestroy(): void {
		this.recipeSubscription.unsubscribe();
	}

	onNewRecipe() {
		this.router.navigate(['new'], { relativeTo: this.route }).then();
	}
}
