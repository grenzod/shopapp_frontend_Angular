import { inject, Injectable } from "@angular/core";
import { TokenService } from "../service/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private tokenServe: TokenService, private router: Router) { }

    canActivate() {
        const isExpired = this.tokenServe.isTokenExpried();
        const isUserIdValid = this.tokenServe.getUserId();

        if (!isExpired && isUserIdValid) {
            return true;
        } else {
            alert('Làm ơn đăng nhập !!');
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AuthGuardProvider: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuard).canActivate();
};
