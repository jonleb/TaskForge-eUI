# Translation Service

## Overview
The eUI offers configuration, initialization, and implementation on module lazily loaded scenarios for translations. Under the hood, it uses the [ngx-translate](https://github.com/ngx-translate/core) package.

## Getting started
To make use of the translation service you need to initialize the service first. This can happen at the level of your choice. Below you'll find an example of that we initialize i18n service at the constructor of our main component. Keep in mind that you can implement your own strategy about the initialization of the translation service. We will showcase two ways of doing that.

### Strategy
The initialization strategy of the i18n service is up to you to decide. You can either just initialize the translation service with a default language or with the user's preference language.

The eUI utilizes two parts to handle translations. The first part is through the global configuration token and the second is through the UserService. Below you will learn what Global configuration offers and how to properly configure it. The UserService, on the other hand, utilizes the NgRx to save user preferences. One of those is the user's default language. So upon eUI initialization the flow is as follows.

1.  Retrieve user preferences and if there is a default language use that to initialize TranslationService
2.  In case it is null then choose the default language set in the Configuration
3.  In case the default language is not set in the configuration set English by default.

### Basic Setup
Since eUI 10.x we decided for eUI to not handle the initialization of translations. Instead, we decided that because of the different application's business flow, it was better to give developers the freedom to handle the initialization of the service. The translation service offer the init() function that returns an observable when the translation service will be ready. In the sample code below we decided to initialize the service at the constructor of the AppComponent which is our first rendered component.

**app.component.ts**
```javascript
...
constructor(private i18nService: I18nService) {
	this.i18nService.init({ activeLang: 'fr' });
}
...
```
or you can initialize the i18nService with the user's preferred language like

**app.component.ts**
```javascript
...
constructor(
	private i18nService: I18nService, 
	private userService: UserService
) {
	this.userService.getState()
		.pipe(
            take(1),
            switchMap((user: UserState) => {
            return this.i18nService.init({ activeLang: user.preferences && user.preferences.lang });
    	}));
}
...
```
## Custom default language Strategy

In case you want to set the browser's language as default then UserPreference language must be null. It's logical if User set there a language by default then why to override it with Browser's one? Then a good practice would be to change Config.defaultLanguage by utilizing the [browser's API](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) . Because of Angular AOT compiler needs code to be a statically analyzable, the set of **defaultLanguage** using navigator will not work. Navigator will always be null. To work around this you need to use a factory as mentioned in the [dynamic configuration](https://webgate.ec.europa.eu/fpfis/wikis/display/eUI/Application+configuration) section

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
        i18nLoader: {
            i18nFolders: ['i18n-eui', 'i18n-ecl', 'i18n'],
        }
    }
};
```
**your\_module.ts**
```javascript
....

@NgModule({
    imports: [
        ...
        UxCoreModule.forRoot(),
		...
    ],
	...
    providers: [
        ...,
		{
            provide: EUI_CONFIG_TOKEN,
            useValue: { appConfig: appConfig, environment: environment }
        },
		...
	]
})
```
  
## Configuration

### Configuration for translated messages

In the `config/global.ts` file, you can specify the languages you intend to use and the default language, using the following parameters:

**config/global.ts**
```javascript
import { GlobalConfig } from '@eui/core';

export const GLOBAL: GlobalConfig = {
  ...
  i18n: {
        i18nService: {
            languages: ['en', 'fr'],
            defaultLanguage: 'en',
        },
        i18nLoader: {
            i18nFolders: ['i18n-eui', 'i18n-ecl', 'i18n'],
        }
  },
  ...
};
```
If these parameters are missing, the `languages` and `defaultLanguage` parameters will be set to `'en'` following the default configuration.

<em>Language Format</em>
> The language codes defined here must **respect** the standard [ISO\_639-1](https://en.wikipedia.org/wiki/ISO_639-1).

### Configuration for static translations (loaded from assets folders)
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
  "statistics.link\_label": "Statistics",  
  "jms\_monitoring.link\_label": "JMS Monitoring",  
  "message\_trace.overview.link\_label": "Message Trace",  
  "message\_trace.link\_label": "Message Trace Overview",  
  "message\_trace.full\_race.link\_label": "Message Full Trace"
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

<em>Observation</em>
> The old `i18nSource` and `i18nQueryParam` parameters have been deprecated in favor of `i18nServices`. If you are still using the old parameters, you will receive a warning message in the console and details about how to migrate to the new version.

### Advanced configuration for static and dynamic translations
If the first two options are not fulfilling your needs, you can configure your translated resources using `i18nResources` parameter. This parameter is of type `I18nResource` or an array of `I18nResource`. Please take a look at the I`18nResource` definition:
```javascript
export interface I18nResource { 
  prefix: string; 
  suffix?: string; 
  compileTranslations?: (translations: any, lang: string) => any;
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

If the format of the translations is different than the key-value pairs, the `compileTranslations` parameter must be defined. For example:
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
...
export const GLOBAL = {  
  ...
  i18n: {
        i18nLoader: {
            i18nFolders: ['i18n-eui'], 
  			i18nResources: [{
   				prefix: 'api/translations/',
    			compileTranslations: CompileTranslations,
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
### Additional configuration for lazy loaded modules
Additional translations can be loaded later, if necessary, in lazy loaded modules.

In the `config/modules.ts` file, please define the modules with lazy loaded translations in this way:
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
            @Inject(MODULE\_NAME\_TOKEN) private moduleName: string) {
}
...
this.i18n.onReady(moduleName)
         .pipe(switchMap(() => this.translate.get('eui.KEY')))
         .subscribe(key => console.log(key));
...
```

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

onLanguageChanged(language: UxLanguage) {  
    this.translateService.use(language.code).subscribe(() => {  
        // handle change 
  });  
  
}

translate(val){
    this.translateService.get(val).subscribe((translated) => {  
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
