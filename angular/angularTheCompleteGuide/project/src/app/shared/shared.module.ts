import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from '../components/alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
	declarations: [
		AlertComponent,
		LoadingSpinnerComponent,
		PlaceholderDirective,
		DropdownDirective,
	],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [
		CommonModule,
		ReactiveFormsModule,
		AlertComponent,
		LoadingSpinnerComponent,
		PlaceholderDirective,
		DropdownDirective,
	],
})
export class SharedModule {}
