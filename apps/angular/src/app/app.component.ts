import { Component } from '@angular/core';
import { tap } from 'rxjs';

import { UserService } from '../core/services/user.service';

/** App component. */
@Component({
  selector: 'camp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public constructor(
    public readonly userService: UserService,
  ) {
    // this.isAuthorized = userService.isAuthorized$;
  }
}
