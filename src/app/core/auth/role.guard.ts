import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { EuiGrowlService } from '@eui/core';
import { PermissionService } from './permission.service';
import { GlobalRole } from './auth.models';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const permissionService = inject(PermissionService);
    const router = inject(Router);
    const growlService = inject(EuiGrowlService);

    const requiredRoles: GlobalRole[] = route.data['roles'];

    if (!requiredRoles || requiredRoles.length === 0) {
        return true;
    }

    if (permissionService.hasGlobalRole(...requiredRoles)) {
        return true;
    }

    growlService.growl({
        severity: 'warning',
        summary: 'Access denied',
        detail: 'You do not have permission to access this page.',
    });

    return router.createUrlTree(['/screen/home']);
};
