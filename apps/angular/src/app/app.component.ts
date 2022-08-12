import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UserService } from '../core/services/user/user.service';

/** App component. */
@Component({
  selector: 'camp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  /** User name. */
  public userName$: Observable<string | undefined>;

  public constructor(
    public readonly userService: UserService,
  ) {
    this.userName$ = this.userService.currentUser$.pipe(
      map(user => user?.firstName),
    );
  }
}
