import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { tap } from 'rxjs';

import { UserService } from '../../../../core/services/user.service';

/** Register Component. */
@Component({
  selector: 'camp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  /** */
  public readonly registrationForm: FormGroup;

  /** */
  public isHiddenPassword = true;

  /** */
  public isHiddenConfirmPassword = true;

  public constructor(
    formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {

    this.registrationForm = formBuilder.group({
      email: ['1@mail.ru', [Validators.required, Validators.email]],
      firstName: ['1', [Validators.required]],
      lastName: ['1', [Validators.required]],
      password: ['rfrytffr2001', [Validators.required]],
      confirmPassword: ['rfrytffr2001', [Validators.required, this.comparePasswords]],
    });
  }

  private comparePasswords(control: FormControl): ValidationErrors | null {
    const pass = control.root.get('password');
    const rePass = control.root.get('confirmPassword');

    if (!pass || !rePass) {
      return null;
    }

    const passVal = pass.value;
    const rePassVal = rePass.value;

    const result = passVal === rePassVal ? null : { noPasswordMatch: true };
    return result;
  }

  /** */
  public register(): void {
    const registrationData = this.registrationForm.value;
    this.userService.register({
      email: registrationData.email,
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      password: registrationData.password,
    })
      .pipe(
        tap(errorMessage => {
          console.log(errorMessage);
          if (errorMessage !== null) {
            this.router.navigate(['/']);
          }
        }),
      )
      .subscribe();
  }
}
