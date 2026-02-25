# Translation Service

## Overview
The eUI incorporates a modular approach for translation functionality, leveraging [ngx-translate](https://github.com/ngx-translate/core) for dynamic content localization. The system is designed to support lazy loading, ensuring resource-efficient management of translation modules.

## Initialization

**Initialization of store-based services within eUI mandates the invocation of the init method. Absent this initiation, services remain non-operational.** The init method, integral for initializing services with a specified state object, supports runtime invocation for dynamic re-initialization. It generates an observable of type EuiServiceStatus.

### Integration of Translation Service
To harness the translation service, preliminary service initialization is essential, as exemplified in **app-starter.service.ts**. This initialization can be strategically placed, such as in the constructor of the primary component, and can follow a customized approach.

```typescript
    start(): Observable<any> {
     
            return zip(
                // ... After user is inited, then initialize the i18n
                this.initUserService().pipe(
                    switchMap((userStatus) => {
                        if (userStatus.success) {
                            // here if userService is successfully created, we use user's pref lang,
                            // and init the i18nService
                            return this.userService.getState().pipe(
                                take(1),
                                switchMap((user: UserState) => {
                                    // If user has preferred language, initilize with prefLang    
                                    if(user.preferences&&user.preferences.lang){
                                    return this.i18nService.init({ activeLang: user.preferences.lang });
                                    }
                                    // If user doesn't have it run default strategy    
                                    return his.i18nService.init();
                                }));
                        } else {
                            return this.i18nService.init();
                        }
                    }),
                ),
                // ...
            );
        }
```

This can happen at the level of your choice. Below you'll find an example of that we initialize i18n service at the constructor of our main component. Keep in mind that you can implement your own strategy about the initialization of the translation service. We will showcase two ways of doing that.

### Init Call Strategy
The initialization strategy of the i18n service is up to you to decide. You can either just initialize the translation service with a default language or with the user's preference language.
The eUI utilizes two parts to handle translations. The first part is through the global configuration token Below you will learn what Global configuration offers and how to properly configure it.

### Active Language Determination Process 

The process of determining the active language involves several steps:

1. Retrieval from the initialization call.
2. Fallback to browser languages, if included in the i18nService.languages array.
3. Default to the i18nService.defaultLanguage in absence of browser language compatibility.
4. Browser language setting as default requires nullification of activeLang. Overriding user-set preferences with browser default is discouraged. Angular AOT compiler constraints necessitate a factory-based workaround for dynamic default language setting.

In case you want to set the browser's language as default activeLang must be null. 
It's logical if User set there a language by default then why to override it with Browser's one? 
Then a good practice would be to change Config.defaultLanguage by utilizing the [browser's API](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) . 
Because of Angular AOT compiler needs code to be a statically analyzable, the set of **defaultLanguage** using navigator will not work. Navigator will always be null. To work around this you need to use a factory as mentioned in the [dynamic configuration](https://webgate.ec.europa.eu/fpfis/wikis/display/eUI/Application+configuration) section

## getState
<b>getState</b> to access to the current state, It will react to the state changes and will emit new state.
When user change the language from [App Shell](./docs/03-app-dev/02-basic-concepts/03-app-shell-customization) 's language list, It will update the
state automatically, then will trigger the i18n's getState.

---
Using instant method of ngx's TranslateService will make you not use updateState's feature for new translations. 
For that scenario you have to subscribe to the getState and set the newLang as user's preferred language. 
Then reload the application (which should get the user's preferred language and init the i18n with that language)
---

 ```typescript
      this.i18nService.getState().subscribe((state:{activeLang:string})=>{
            // example scenario
            this.setUserPrefLang(state.activeLang).subscribe(()=>{
                  window.location.reload();
            });
            
      });
 ```
 
## updateState

---

***When user change the language from [App Shell](./docs/03-app-dev/02-basic-concepts/03-app-shell-customization) 's language list, It will update the
   state automatically. You don't need to handle yourself, it is already managed internally.***

---
<b>updateState</b> to update state, it will not reset the service but update the state in order to trigger a behavioral change.
It will load the translations If the language isn't used yet. If It is already load, It will reuse it from the cache.
If you're using translate pipe or using ngx-translate's TranslateService's getStreamOnTranslationChange pattern, translations will be adapted.
Using instant will make you not use updateState's feature for new translations. For that scenario you have to subscribe to the getState and set the newLang as
user's preferred language. Then reload the application (which should get the user's preferred language and init the i18n with that language)
---

***It will trigger getState method. Avoid cyclic calls!***

---

**example.ts**
```typescript
this.i18nService.updateState({ activeLang: "newLangId" });
```

  
## i18nService Configuration 

**config/global.ts**
```javascript
import { GlobalConfig } from '@eui/core';

export const GLOBAL: GlobalConfig = {
    appTitle: 'eUI-app',
    i18n: {
        i18nService: {
            languages: ['en', 'fr'],
            defaultLanguage: 'en',
        },
        // ..
    }
};
```

### defaultLanguage
defaultLanguage will be used as source of truth while setting @ngx-translate TranslateService's default language.
When there is missing translation for activeLang, defaultLang translation will be used.
If `defaultLanguage` is missing, It will be set to `'en'` following the default configuration.

### languages
The languages that you have translations of them should be defined in languages array.
@ngx-translate TranslateService's addLangs method will be called with it.
[App Shell](./docs/03-app-dev/02-basic-concepts/03-app-shell-customization) 's language list component will be created from the languages array too.

If languages is missing, It will be set to `['en']` following the default configuration.
<em>Language Format</em>
> The language codes defined here must **respect** the standard [ISO_639-1](https://en.wikipedia.org/wiki/ISO_639-1).

In order to have a custom defined language list that will be rendered on the language selector modal (in the application shell)
you can use the `i18nService.languages` property. This property is an array of objects that have the following structure:

```typescript
export const GLOBAL: GlobalConfig = {
    ...,
    i18n: {
        i18nService: {
            "languages": [
                "en", "fr", "el", "es", "it", "nl", "pt", "ru", "zh",
                {
                    "code": "ru",
                    "label": "Russian"
                },
                {
                    "code": "tr",
                    "label": "Turkish"
                }
            ],
            defaultLanguage: 'en',
        },
        ...
    },
    ...
};
```

Below you might find the interfaces for that.

```typescript
export interface I18nServiceConfig {
    /** an ISO 2 char code array of available languages */
    languages?: (string | EuiLanguage)[];
    /** default language to be used in case of not any has been set */
    defaultLanguage?: string;
}
export interface EuiLanguage {
    /** the ISO language code e.g. en or fr */
    code: string;
    /** the label of the language translated in that language */
    label: string;
}
```

In case that you want to update the language selector List on the fly, you can use the `setState` method of the `EuiAppShellService`:

```typescript
EuiAppShellService.setState(state: UIState): void;
```

That is useful in scenarios where you want the labels of each language to be translated in the language itself.
For example if you have a language selector that has the following languages: Greek and English,
you might want to have the labels of the languages to be translated in the language itself e.g. Ελληνικά and English
when selected language is Greek, while selected translation is English, all you have to do is to update the languages array state through AppShellService.

For example, for previous sample let's say that you switched from English to Russian and you would like to update the labels
what you can do is to use setState to update the language list:
```typescript
// where "as" is the injected EuiAppShellService
this.as.setState({
    ...this.as.state,
    languages: [
        'en', 'fr', 'el', 'es', 'it', 'nl', 'pt', 'ru', 'zh',
        {
            code: 'ru',
            label: 'Русский',
        },
        {
            code: 'tr',
            label: 'Tурецкий',
        },
    ],
});
```

For more advanced scenarios you can use translation keys as labels and use translation service to translate them like
the following example:

```typescript
// where "as" is the injected EuiAppShellService
// and "translate" is the injected TranslateService
this.i18n.getState('activeLang').subscribe(state => {
    this.as.setState({
        ...this.as.state,
        languages: [
            'en', 'fr', 'el', 'es', 'it', 'nl', 'pt', 'ru', 'zh',
            {
                code: 'ru',
                label: this.translate.instant('i18n.language.ru'),
            },
            {
                code: 'tr',
                label: this.translate.instant('i18n.language.tr'),
            },
        ],
    });
});

```

## i18nLoader Configuration

### Loader configuration for static translations (loaded from assets folders)
In the `config/global.ts` file, please use the `i18nFolders` parameter, as in the following example:
```javascript
export const GLOBAL = {  
  ...
  i18n: {
        i18nLoader: {
            i18nFolders: ['i18n-eui', 'i18n'],
        }
  },
  ...
};
```
The parameter `i18nFolders` is accepting a string or an array of strings. According to this configuration, if the active language is set to`'en'`, the translation service will load two resources (files), from a`ssets/i18n-eui/en.json` file and a`ssets/i18n/en.json` .

Please notice that the `i18n-eui` folder is part of the eUI core and it is used by the eUI components.

At the a`ssets/i18n/en.json` file, translation service expects this format:
```javascript
{ 
  ...
  "page.home.title": "Welcome to eUI!",  
  "app.search.button": "Search",  
  "statistics.link_label": "Statistics",  
  "jms_monitoring.link_label": "JMS Monitoring",  
  "message_trace.overview.link_label": "Message Trace",  
  "message_trace.link_label": "Message Trace Overview",  
  "message_trace.full_race.link_label": "Message Full Trace"
  ...
};
```

### Configuration for dynamic translations (loaded from web services)
In the `config/global.ts` file, please use the `i18nServices` parameter, as in the following example:
```javascript
import { environment } from '../environments/environment';  

...
export const GLOBAL = {  
  ...  
  i18n: {
        i18nLoader: {
            i18nFolders: ['i18n-eui'], 
  			i18nServices: [`${environment.apiBaseUrl}translations/`], // don't forget '/'
        }
  },
  ...
};
```

For the base url `'i18n/'` and active language 'fr', the translation service will load the translations from GET **`api/translations/fr`**

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-translation-webservice?embed=1&file=src/config/global.ts&hideNavigation=1"></iframe>)

If your service is using a query parameter, you can define it in this way:
```javascript
import { environment } from '../environments/environment';
...
export const GLOBAL = {  
  ...  
  i18n: {
        i18nLoader: {
            i18nFolders: ['i18n-eui'],
  			i18nServices: [`${environment.apiBaseUrl}translations?lang=`],
        }
  },
  ...
};
```
For the base url `'i18n/'` and active language 'fr', the translation service will load the translations from GET **`api/translations?lang=fr`**

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-translation-query-params?embed=1&file=src/config/global.ts&hideNavigation=1"></iframe>)

<em>Observation</em>
> The old `i18nSource` and `i18nQueryParam` parameters have been deprecated in favor of `i18nServices`. If you are still using the old parameters, you will receive a warning message in the console and details about how to migrate to the new version.

### Advanced configuration for static and dynamic translations
If the first two options are not fulfilling your needs, you can configure your translated resources using `i18nResources` parameter. This parameter is of type `I18nResource` or an array of `I18nResource`. Please take a look at the I`18nResource` definition:
```javascript
export interface I18nResource { 
  prefix: string; 
  suffix?: string;
  /** It is an ID of the function which should be defined into the customHandlers with the interface TranslationsCompiler */
  compileTranslations?: string;
};
```

For example, to load static translations from another asset folder than `assets`:
```javascript
export const GLOBAL = {  
  ...
  i18n: {
        i18nLoader: {
            i18nFolders: ['i18n-eui'],
  			i18nResources: [{
   				prefix: 'other-assets/i18n/',
   				suffix: '.json',
  			}],
        }
  },
  ...
};
```

For the active language `'it'`, the translation service will load the translations from `other-assets/i18n/it.json`.

If the format of the translations is different then the key-value pairs, the `compileTranslations` parameter must be defined. For example:
```javascript
export function CompileTranslations(translations: any): any {
    const result = {};
    translations.forEach((translation: any) => {
        // extract the key and value from the translation object
        const key = translation['key'];
        const value = translation['value'];
        if (key && value) {
            result[key] = value;
        }
    });
    return result;
}
export const appConfig: EuiAppConfig = {
    global: GLOBAL,
    modules: MODULES,
    customHandler: {
        'CompileTranslations_ID': CompileTranslations
    }
};
```
Then declare the i18nResources using the ID of the customHandler you provided in the AppConfig
```javascript
export const GLOBAL = {  
  ...
  i18n: {
    i18nLoader: {
        i18nFolders: ['i18n-eui'], 
        i18nResources: [{
            prefix: 'api/translations/',
            compileTranslations: 'CompileTranslations_ID',
        }],
    }
  },
  ...
};
```

In this case, the format of the translations sent by the service, presented below, is compiled in a format accepted by the translation service:
```javascript
{ 
  ...
  {
     "key": "page.home.title",
     "value": "Welcome to eUI!",
  },
  ...
};
```

sb-translation-lazyload
## Lazy load translation modules
Additional translations can be loaded later, if necessary, in lazy load modules.

---

***When you use lazy load translations feature, It is important to use [APP_INITIALIZER token while providing AppStarterService](./docs/10-advanced-concepts/02-app-starter/01-app-starter-service#calling-start-method--app_initializer).
Otherwise, you might have some async problems***

---

In the `config/modules.ts` file, please define the modules with lazy load translations in this way:
```javascript
export const MODULES = {  
  ...
  portfolio: {
    ...
    i18nFolders: ['i18n-portfolio'], 
    ...
  },
  tasks: {
    ...
    i18nServices: [`api/translations/tasks/`],
    ...
  },
  ...
};
```

We still need to link the module with its own configuration. This can be done using the following code:
```javascript
import { NgModule } from '@angular/core';
import { CoreModule } from '@eui/core';
...
@NgModule({
  ...
    imports: [
    ...
        CoreModule.forChild('portfolio'),
    ...
    ],
  ...
})

export class PortfolioModule {}
```

The translation service will load the additional translations from `assets/i18n-portfolio/en.json (for active language` `'en'`)

Please use the `i18nFolders`, `i18nServices` and `i18nServices` parameters in the same way as described for global configuration.

<em>onReady</em>

When using lazy-loaded modules you are not sure when translations coming either from a service or assets folder has been loaded. Thus you may not know when translations are available for you to use them. For that case, we created the **I18nService.onReady()** function which returns an observable emits an event only when translations loading finished. Keep in mind that you can use that for a specific moduleName, meaning that it will emit only for that specific module. Below you can find example usage of this function.
```javascript
...
constructor(private translateService: TranslateService, 
            private i18n: I18nService,
            @Inject(MODULE_NAME_TOKEN) private moduleName: string) {
}
...
this.i18n.onReady(moduleName)
         .pipe(switchMap(() => this.translate.get('eui.KEY')))
         .subscribe(key => console.log(key));
...
```

[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-translation-lazyload?embed=1&file=src/app/app.module.ts&hideNavigation=1"></iframe>)

## Usage @ngx-translate
_docs: [https://github.com/ngx-translate/core](https://github.com/ngx-translate/core)_

Adding Project In the `core/core.module.ts` file, add the following:
```javascript
import { TranslateModule } from '@ngx-translate/core';
import { translateConfig } from '@eui/core';
  
@NgModule({  
    imports: [  
       ...
      TranslateModule.forRoot(translateConfig),
      ...  
    ],  
  declarations: [],
})
```
Translation Service
```javascript
import { TranslateService } from '@ngx-translate/core'

constructor( ... private translateService: TranslateService, ... ) 

onLanguageChanged(language: EuiLanguage) {  
    this.translateService.use(language.code).subscribe(() => {  
        // handle change 
  });  
  
}

translate(val){
    this.translateService.getStreamOnTranslationChange(val).subscribe((translated) => {  
         // do your stuff
    });
}
```
  
This is how you do it with the pipe:
```html
<div>{{ 'HELLO' | translate:param }}</div>
```
And in your component define `param` like this:
```javascript
param = {value: 'world'};
```
  
This is how you use the directive:
```html
<div [translate]="'HELLO'" [translateParams]="{value: 'world'}"></div>
```
  
Or even simpler using the content of your element as a key:
```html
<div translate [translateParams]="{value: 'world'}">HELLO</div>
```
