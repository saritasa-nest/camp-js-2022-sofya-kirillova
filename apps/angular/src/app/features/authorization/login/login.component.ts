import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

import { UserService } from '../../../../core/services/user.service';

/** Login Component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  /** */
  public readonly authorizationForm: FormGroup;

  /** */
  public isHiddenPassword = true;

  public constructor(
    formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {

    this.authorizationForm = formBuilder.group({
      email: ['1@mail.ru', [Validators.required, Validators.email]],
      password: ['rfrytffr2001', [Validators.required]],
    });
  }

  /** */
  public login(): void {
    const registrationData = this.authorizationForm.value;
    this.userService.login({
      email: registrationData.email,
      password: registrationData.password,
    })
      .pipe(
        tap(errorMessage => {
          // console.log(errorMessage);
          if (errorMessage !== null) {
            this.router.navigate(['/']);
          } else {
            console.log('error');
          }
        }),
      )
      .subscribe();
  }
}
