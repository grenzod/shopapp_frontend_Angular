import { inject, Injectable } from "@angular/core";
import { TokenService } from "../service/token.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../service/user.service";
import { CartService } from "../service/cart.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    constructor(private tokenService: TokenService, 
                private router: Router,
                private userService: UserService,
                private cartService: CartService) { }

    canActivate() {
        const isExpired = this.tokenService.isTokenExpried();
        const roleId = this.tokenService.getRoleId();
        const userId = this.tokenService.getUserId();

        if (!isExpired && roleId == 2 && userId != null) {
            return true;
        } else {
            this.userService.removeUserFromLocalStorage();
            this.cartService.clearCart();
            this.tokenService.removeToken();
            this.tokenService.logout();
            alert('Làm ơn đăng nhập !!');
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const AdminGuardProvider: CanActivateFn = (
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot) => {
    return inject(AdminGuard).canActivate();
};
