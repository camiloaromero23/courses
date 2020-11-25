import { Injectable } from '@angular/core';
import { Recipe } from './recipes.model';

@Injectable({
	providedIn: 'root',
})
export class RecipesService {
	private recipes: Recipe[] = [
		{
			id: 'r1',
			title: 'Schnitzel',
			imageUrl:
				'https://www.washingtonpost.com/rf/image_982w/2010-2019/WashingtonPost/2016/10/12/Food/Images/PorkSchnitzel-93591476292525.jpg',
			ingredients: ['French Fries', 'Pork Meat', 'Salad'],
		},
		{
			id: 'r2',
			title: 'Spaghetti',
			imageUrl:
				'https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg',
			ingredients: ['Spaghetti', 'Meat', 'Tomatoes'],
		},
	];
	constructor() {}

	getAllRecipes() {
		return [...this.recipes];
	}

	getRecipe(recipeId: string) {
		return {
			...this.recipes.find((recipe) => {
				return recipe.id === recipeId;
			}),
		};
	}

	deleteRecipe(recipeId: string) {
		this.recipes = this.recipes.filter((recipe) => {
			return recipe.id !== recipeId;
		});
	}
}
