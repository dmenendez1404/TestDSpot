import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from '../core/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this._authService.isAuthenticated()) {
            return true;
        }

        this._router.navigate(['/login']);
        return false;
    }

}
