import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const require = next.data.require;
    if (require === 'logged') {
      return this.authService.user.pipe(
        take(1),
        map(user => !!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/login']).then(null);
          }
        })
      );
    } else if (require === 'not logged') {
      return this.authService.user.pipe(
        take(1),
        map(user => !!!user),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/students']).then(null);
          }
        })
      );
    } else if (require === 'admin') {
      return this.authService.user.pipe(
        take(1),
        map(user => user && user.role === 'admin'),
        tap(isAdmin => {
          if (!isAdmin) {
            this.router.navigate(['/students']).then(null);
          }
        })
      );
    }
  }
}
