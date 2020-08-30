import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
	static invalidProjectName(
		formControl: FormControl,
	): { [s: string]: boolean } {
		if (formControl.value === 'Test') {
			return { invalidProjectName: true };
		}
		return null;
	}

	static asyncInvalidProjectName(
		formControl: FormControl,
	): Promise<any> | Observable<any> {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (formControl.value === 'Test Project') {
					resolve({ invalidProjectName: true });
				} else {
					resolve(null);
				}
			}, 2000);
		});
	}
}
