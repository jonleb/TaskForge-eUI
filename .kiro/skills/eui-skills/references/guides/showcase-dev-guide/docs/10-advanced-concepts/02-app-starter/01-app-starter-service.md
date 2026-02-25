# App Starter Service
App Starter Service is a responsible to initialize eUI Core services, and your custom services before the application starts.

## Creating AppStarter service
Below you will find a sample implementation of the default generated AppStater service that is being used to initialize some eUI services.

---

***Keep in mind that this implementation shows you how you can initialize certain parts, and you should adapt the code based on your Application and business needs.***

---

```typescript
import { Inject, Injectable } from '@angular/core';
import {
    CONFIG_TOKEN,
    UserService,
    EuiAppConfig,
    UserDetails,
    UserPreferences,
    I18nService,
} from '@eui/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AppStarterService {
    defaultUserPreferences: UserPreferences;

    constructor(
        protected userService: UserService,
        protected i18nService: I18nService,
        @Inject(CONFIG_TOKEN) private config: EuiAppConfig,
        protected http: HttpClient,
    ) {
    }

    start(): Observable<any> {

        return zip(
            this.initUserService().pipe(
                switchMap((userStatus) => {
                    console.log(userStatus);
                    return this.i18nService.init();
                }),
            ),
        );
    }

    /**
     * Fetches user details,
     * create user: UserState object
     * then initialise to the UserService on run time
     */
    initUserService(): Observable<any> {
        return zip(
            this.fetchUserDetails(),
        ).pipe(
            switchMap(([userDetails]) => {
                return this.userService.init(userDetails);
            }));
    }

    /**
     * Fetches user details
     */
    private fetchUserDetails(): Observable<UserDetails> {
        // const url = this.config.modules.your_custom_module.your_custom_endpoint
        const moduleCoreApi = this.config.modules.core;
        const url = `${moduleCoreApi.base}${moduleCoreApi.userDetails}`;
        const user = { userId: 'anonymous' };

        if (!url) {
            return of(user);
        }
        return this.http.get<UserDetails>(url);
    }
}
```
## Calling start method  (APP_INITIALIZER)

This is the safest way to initialize eUI Services and other parts of your application before rendering starts. All you need to do is provide the APP_INITIALIZER, an angular provider, and that's it.
```javascript
@NgModule({
    declarations: [...],
    imports: [...],
    providers: [
        {
            provide: APP_INITIALIZER, 
            useFactory: (appStarterService) => {
                return () => new Promise<void>((resolve) => {
                        appStarterService.start().subscribe( ()=> resolve());
                    });
            },
            deps: [AppStarterService], 
            multi: true
        },
        AppStarterService,
        ...
    ],
    bootstrap: [...],
})
export class AppModule {}
```
After that Promise resolves rendering, routing etc. will start to happen.

## Deprecated way (Calling via AppComponent )

---
<em>**IMPORTANT NOTE**</em>: 
Calling  app-starter.service start method from app.component level is no longer suggested. 
When you use the lazy load features of eUI for translations it might cause bugs.
You have to use <b>APP_INITIALIZER<b> strategy.
---
