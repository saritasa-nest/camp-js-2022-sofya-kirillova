import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { tap } from 'rxjs';

import { UserService } from '../../../../core/services/user.service';

/** Register component. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  /** Register form. */
  public readonly registerForm: FormGroup;

  /** Is the password hidden. */
  public isHiddenPassword = true;

  /** Is the confirmation password hidden. */
  public isHiddenConfirmPassword = true;

  public constructor(
    formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef,
  ) {

    this.registerForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, this.restartPasswordComparison]],
      confirmPassword: ['', [Validators.required, this.comparePasswords]],
    });
  }

  private restartPasswordComparison(control: FormControl): void {
    const passwordControl = control.root.get('password');
    const confirmPasswordControl = control.root.get('confirmPassword');
    if (!passwordControl || !confirmPasswordControl || confirmPasswordControl.value === '') {
      return;
    }
    confirmPasswordControl.setErrors({ noPasswordMatch: true });
  }

  private comparePasswords(control: FormControl): ValidationErrors | null {
    const passwordControl = control.root.get('password');
    const confirmPasswordControl = control.root.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl || confirmPasswordControl.value === '') {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { noPasswordMatch: true };
  }

  /** Handle 'submit' of the register form. */
  public register(): void {
    const registrationData = this.registerForm.value;
    this.userService.register({
      email: registrationData.email,
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      password: registrationData.password,
    })
      .pipe(
        tap(errorMessage => {
          if (errorMessage !== null) {
            const errors = Object.entries(errorMessage.data).reduce((body, error) => {
              if (error[1] !== null) {
                body.push(...error[1]);
              }
              return body;
            }, [] as string[]);
            this.registerForm.setErrors({ data: errors.join(' ') });
            this.cdr.markForCheck();
          }
        }),
      )
      .subscribe();
  }
}
