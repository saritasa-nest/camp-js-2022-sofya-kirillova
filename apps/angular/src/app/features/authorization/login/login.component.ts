import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { UserService } from '../../../../core/services/user.service';

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  /** Login form.  */
  public readonly loginForm: FormGroup;

  /** Is the password hidden. */
  public isHiddenPassword = true;

  public constructor(
    formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef,
  ) {

    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /** Handle 'submit' of the login form. */
  public login(): void {
    const authorizationData = this.loginForm.value;
    this.userService.login({
      email: authorizationData.email,
      password: authorizationData.password,
    }).pipe(
      tap(errorMessage => {
        if (errorMessage !== null) {
          this.loginForm.setErrors({ detail: (errorMessage.detail) });
          this.cdr.markForCheck();
        }
      }),
    )
      .subscribe();
  }
}
