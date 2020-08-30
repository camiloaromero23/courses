import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [{ path: '', component: AuthComponent }];

@NgModule({
	declarations: [AuthComponent],
	imports: [SharedModule, RouterModule.forChild(route)],
	exports: [AuthComponent, RouterModule],
})
export class AuthModule {}
