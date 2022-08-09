import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models/token';

import { concat, defer, Observable, race, ReplaySubject, shareReplay, tap, mapTo } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

const TOKEN_STORAGE_KEY = 'token';

/** Token storage. */
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  /** Token info for current user. */
  private readonly currentToken$: Observable<Token | null>;

  /** Current user Token. */
  private readonly currentTokenValue$ =
    new ReplaySubject<Token | null>(1);

  public constructor(
    private readonly storageService: LocalStorageService,
  ) {
    this.currentToken$ = this.initCurrentTokenStream();
  }

  /**
   * Saves a token.
   * @param token Token to save.
   */
  public saveToken(
    token: Token,
  ): Observable<Token> {
    return defer(() =>
      this.storageService.save(TOKEN_STORAGE_KEY, token)).pipe(
      tap(() => this.currentTokenValue$.next(token)),
      mapTo(token),
    );
  }

  /**
   * Gets current token.
   */
  public getToken(): Observable<Token | null> {
    return this.currentToken$;
  }

  /** Removes current Token. */
  public removeToken(): Observable<void> {
    console.log(65575)
    return defer(() =>
      this.storageService.remove(TOKEN_STORAGE_KEY)).pipe(tap(() => this.currentTokenValue$.next(null)));
  }

  private initCurrentTokenStream(): Observable<Token | null> {
    const tokenChange$ = this.currentTokenValue$;
    const tokenFromStorage$ = concat(
      defer(() =>
        this.storageService.get<Token>(TOKEN_STORAGE_KEY)),
      tokenChange$,
    );

    return race(tokenFromStorage$, tokenChange$).pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }
}
