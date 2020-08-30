import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
	{
		path: 'recipes',
		loadChildren: () =>
			import('./components/recipes/recipes.module').then(
				(module) => module.RecipesModule,
			),
	},
	{
		path: 'shopping-list',
		loadChildren: () =>
			import('./components/shopping-list/shopping-list.module').then(
				(module) => module.ShoppingListModule,
			),
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./components/auth/auth.module').then(
				(module) => module.AuthModule,
			),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
