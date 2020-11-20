import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/auth/store/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RecipeEffects } from './components/recipes/store/recipe.effects';

@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
		CoreModule,
		StoreModule.forRoot(appReducer),
		StoreDevtoolsModule.instrument({ logOnly: environment.production }),
		EffectsModule.forRoot([AuthEffects, RecipeEffects]),
		StoreRouterConnectingModule.forRoot(),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
