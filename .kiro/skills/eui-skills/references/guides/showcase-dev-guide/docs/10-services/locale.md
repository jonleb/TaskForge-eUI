# Locale Service

## Overview
**LocaleService** is an Angular service responsible for managing locale states and configurations. It provides functionalities for updating the application's state based on these locales. The service is a key part of internationalization in the application, handling tasks such as language changes and locale data management.

## Background
The need for an eUI locale service emerged from the fact that many EU applications were handling locale scenarios differently. Also, many eUI components render data that can be transformed for a different locale. But what is a locale? The amount of currency displayed in France is different from the one depicted in Greece e.g.
€ 8 000,90 vs   € 8,000.90 . Does the locale have a 1-1 map with languages? No, a language can have more than one locale, e.g. the Greek language has two locale Greek EL-GR and Cypriot EL-CY.

## What is this Service about?
This service is responsible for holding the state of the current selected locale. Other features of this services include the binding with the Translate service so as locale will change upon language change.

## How to setup?
To use this service you need to initialize it. This can be done by simply
```
this.localeService.init(state?).subscribe(status => { .... } );
```
**WARNING! Make sure this service has being initialized after the i18nService init have finished.**

The locale state interface is
```
export interface LocaleState {  
   id: string;  
  [key: string]: any;  
}
```
Make sure that the locale ID you are passing exists in [CLDR](http://cldr.unicode.org/)

**WARNING! Since v15 we have decided to remove the lazy-loading of different locale. This means that you have to provide and register them by yourself. **

### Provide and register locale data (migrate from v14 and before)
If you know that your application will consume a specific locale you can provide it by yourself. This can be done by importing the locale data and registering it in the locale service. This can be done by
```typescript
import { registerLocaleData } from '@angular/common';
import localeFR from '@angular/common/locales/fr';
import localeFRbe from '@angular/common/locales/fr-BE';
import localeEN from '@angular/common/locales/en';
import localeExtraEN from '@angular/common/locales/extra/en';

registerLocaleData(localeFR);
registerLocaleData(localeFRbe);
registerLocaleData(localeEN, localeExtraEN);
```
Make sure that you will register the locale data (and their extra) before the locale service init.

## How to configure?
You can also configure the service through application configuration. The interface of the locale is
```
export interface LocaleServiceConfig {  
  bindWithTranslate?: boolean;  
}
```
You can simply pass the locale config through via the global.ts like
```
export const GLOBAL: GlobalConfig = {
	user: { ... }  
	i18n: { ... }
	locale: {
	   bindWithTranslate: false;
	}
}
``` 
[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-locale-setup?embed=1&file=src/config/global.ts&hideNavigation=1"></iframe>)

## Advanced topics
As we said that service does configure the angular locale service behind the scenes.
```aidl
.....
getCurrencySymbol()	
Retrieves the currency symbol for a given currency code.

getLocaleCurrencyCode()	
Retrieves the default currency code for the given locale.

getLocaleCurrencyName()	
Retrieves the name of the currency for the main country corresponding to a given locale. For example, 'US Dollar' for en-US.

getLocaleCurrencySymbol()	
Retrieves the symbol used to represent the currency for the main country corresponding to a given locale. For example, '$' for en-US.

getLocaleDateFormat()	
Retrieves a localized date-value formating string.

getLocaleDateTimeFormat()	
Retrieves a localized date-time formatting string.
.....
```
Check more [here](https://angular.io/api/common).

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-locale-advanced-topics?embed=1&file=src/app/app.component.ts&hideNavigation=1"></iframe>)

### Locale ID Mapper
If you provide a locale id of only the country code `e.g. EL` or you use the bind with Translate Service feature, you can provide a mapper function. This function will be responsible for mapping the provided ID with the default locale you want to use. Of course, the business logic of that function might be more complex, e.g. inject other services and doing more complex logic.
By default, this mapper will use the [getLocaleId](https://angular.io/api/common/getLocaleId) of angular, but you can pass your own.
The mapper token name is **LOCALE_ID_MAPPER**.

Below you can find a example usage of it which if the request ID is fr it turns locale to fr-BE.
```javascript
@Injectable({ providedIn: 'root' })
export class YourServiceClass {
    ...
    getId(locale: string) {
        if (locale === 'fr') {
            return 'fr-BE';
        }
        ...
    }
}
...
@Module({
    ...
    providers: [
        ...
            {
                provide: LOCALE_ID_MAPPER, 
                useFactory: (injector): Function => {
                    const yourService: YourServiceClass = injector.get(YourServiceClass);
                    return yourService.getId;
                },
                deps: [Injector],
        },
    ],
}
...
```

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-locale-id-mapper?embed=1&file=src/app/app.module.ts&hideNavigation=1"></iframe>)

### Locale load strategy
During the init(), the priority has the locale passed through the init function optional state parameter, then follow the locale provided by LOCALE_ID token, then the browser ones and last but not least, in case of SSR usage, the empty array.


## Usage
The LocaleService is designed to be injected into Angular components or other services to manage locale-related functionalities. It provides a robust and flexible way to handle internationalization by dynamically loading and updating locale data as needed.

## Notes
The service leverages Angular's dependency injection, making it easy to integrate into existing Angular applications.
The addLocale method is deprecated and should be avoided in favor of more dynamic locale management strategies.
This documentation provides a detailed overview of the LocaleService, its responsibilities, and its methods, facilitating its use and integration into Angular applications for effective locale management.

# LocaleService Configuration FAQ
1. **Can I set the initial state of LocaleService through the configuration file?**

    No, the initial state of the LocaleService instance is determined by Angular’s LOCALE_ID value, which defaults to en-US. You can refer to [Angular’s documentation]( https://angular.dev/api/core/LOCALE_ID/) for more on LOCALE_ID.
    
    To set the state, use the init(...) function of LocaleService.

2. **Why does my LocaleService initialize with en instead of the intended en-GB?**
   
    This occurs because the corresponding Angular locale data for en-GB has not been imported and registered within your application. Ensure you import and register each required locale as shown below:

    ```typescript
    import { registerLocaleData } from '@angular/common';
    import enGB from "@angular/common/locales/en-GB";
    registerLocaleData(enGB);
    ```
    Note: If no argument is passed to the init() function, it defaults to the LOCALE_ID value.

3. **When I change the language using i18n, why is the locale state not updating?**
   
    This can happen if the bindWithTranslate configuration is set to false. Verify the setting for bindWithTranslate in your configuration or consult the documentation for additional details on its impact.

4. **How can I modify the default mapping behavior from en to en-US to use en-BE instead?**

    To customize locale mapping, you can use the LOCALE_ID_MAPPER token to implement a custom mapping function. Note: Ensure that any locale you intend to map is registered in the application.

    Example:
    
    ```typescript
    {
        provide: LOCALE_ID_MAPPER,
        useFactory: (): LocaleMapper => {
            const getId = (locale: string) => {
            return locale.includes('en') ? 'en-BE' : locale;
            }
            return getId;
        },
    }
    ``
