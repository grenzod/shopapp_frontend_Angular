import { inject, Injectable } from "@angular/core";
import { TokenService } from "../service/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    constructor(private tokenServe: TokenService, private router: Router) { }

    canActivate() {
        const isExpired = this.tokenServe.isTokenExpried();
        const roleId = this.tokenServe.getRoleId();
        const userId = this.tokenServe.getUserId();

        if (!isExpired && roleId == 2 && userId != null) {
            return true;
        } else {
            return false;
        }
    }
}

export const AdminGuardProvider: CanActivateFn = (
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) => {
    return inject(AdminGuard).canActivate();
};
