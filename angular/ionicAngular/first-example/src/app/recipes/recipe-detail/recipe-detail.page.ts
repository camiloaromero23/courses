import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.page.html',
	styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {
	loadedRecipe: Recipe;
	constructor(
		private activatedRoute: ActivatedRoute,
		private recipesService: RecipesService,
		private router: Router,
		private alertController: AlertController,
	) {}

	ngOnInit() {
		this.activatedRoute.paramMap.subscribe((paramMap) => {
			if (!paramMap.has('recipeId')) {
				this.router.navigate(['/recipes']);
				return;
			}
			const recipeId = paramMap.get('recipeId');
			this.loadedRecipe = this.recipesService.getRecipe(recipeId);
		});
	}

	deleteRecipeHandler(recipeId: string) {
		this.alertController
			.create({
				header: 'Are you sure?',
				message: 'Do you want to delete it?',
				buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
					},
					{
						text: 'Delete',
						handler: () => {
							this.recipesService.deleteRecipe(recipeId);
							this.router.navigate(['/recipes']);
						},
					},
				],
			})
			.then((alertElement) => {
				alertElement.present();
			});
	}

	ngOnDestroy() {}
}
