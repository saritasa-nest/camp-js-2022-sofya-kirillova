import { Injectable } from '@angular/core';

import { tap, Observable, switchMap } from 'rxjs';

import { RegistrationData } from '../utils/interfaces/auth.interface';

import { LoginData } from './../utils/interfaces/auth.interface';

import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

/** User service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public constructor(
    private readonly tokenStorage: TokenStorageService,
    private readonly authService: AuthService,
  ) { }

  /**
   *
   * @param userData
   */
  public register(userData: RegistrationData): Observable<Object | null> {
    return this.authService.register(userData).pipe(
      switchMap(token => this.tokenStorage.saveToken(token)),
    );
  }

  /**
   *
   * @param userData
   */
  public login(userData: LoginData): Observable<Object | null> {
    return this.authService.login(userData).pipe(
      switchMap(token => this.tokenStorage.saveToken(token)),
    );
  }
}
