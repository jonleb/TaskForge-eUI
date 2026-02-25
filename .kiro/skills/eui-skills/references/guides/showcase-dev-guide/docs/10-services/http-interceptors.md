# HTTP Interception Mechanisms in eUI

## Overview
In eUI, a suite of HTTP interceptors is provided to alleviate the development workload associated with eUI applications. Key interceptors include CachePreventionInterceptor, CorsSecurityInterceptor, CsrfPreventionInterceptor, AddLangParamInterceptor, and EuLoginSessionTimeoutHandlingInterceptor. These are predominantly focused on ensuring the security of eUI applications and facilitating integration with EU Login.

## Getting started
For incorporating these interceptors, they must be declared within the Root module of your eUI application. These interceptors are accessible via the @eui/core package. Comprehensive details for each interceptor, along with instructions for implementation, are provided below. It's important to note that if a proxy is present in the SPA-API server communication path, it might modify HTTP headers.

## CachePreventionInterceptor
This interceptor instructs intermediary proxies to avoid serving a cached version of a resource. It ensures that each server in the chain verifies the resource's validity. The mechanism employed by this interceptor involves modifying the HTTP headers to set Cache-Control to No-cache. To integrate this interceptor, proceed as follows:

**app.module.ts**
```javascript
...
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CachePreventionInterceptor } from '@eui/core';

@NgModule({
    ...
    providers: [
        ...
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CachePreventionInterceptor,
            multi: true,
        }
    ],
    ...
})
export class AppModule { }
```

## CorsSecurityInterceptor
Sets the **`withCredentials`** options on the Ajax Request to send the **`JSESSIONID`** cookie to another domain. That is necessary when EU Login protects the other domain. Using this **`JSESSIONID`** cookie, an already authenticated user can be used to call the service. For more detailed information about the Withcredentials property check [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials). To use it, add the following:

**app.module.ts**
```javascript
 ...
 import { HTTP_INTERCEPTORS } from '@angular/common/http';
 import { CorsSecurityInterceptor } from '@eui/core';
 
 @NgModule({
     ...
     providers: [
         ...
         {
             provide: HTTP_INTERCEPTORS,
             useClass: CorsSecurityInterceptor,
             multi: true,
         }
     ],
     ...
 })
 export class AppModule { }
```

## CsrfPreventionInterceptor
Adds a specific HTTP header to each Ajax request. That is the **X-Requested-With: XMLHttpRequest.** This ensures that the request is set by a piece of JavaScript code in the application. It is only possible to add request headers using JavaScript. Using normal HTML elements like iframe, img, ... therefore cannot trigger correct service requests and are blocked. This prevents dynamically-loaded content from forging a request in the name of the currently logged-in user (_XSS attack_). Be aware that this assumes that cross-site scripting (XSS) is already put in place, which is the default setting in Angular applications. A piece of very detailed information about the usage of the **X-Requested-With** HTTP header [check this out](https://stackoverflow.com/questions/17478731/whats-the-point-of-the-x-requested-with-header#answer-22533680). To use it, add the following:

**app.module.ts**
```javascript
 ...
 import { HTTP_INTERCEPTORS } from '@angular/common/http';
 import { CsrfPreventionInterceptor } from '@eui/core';
 
 @NgModule({
     ...
     providers: [
         ...
         {
             provide: HTTP_INTERCEPTORS,
             useClass: CsrfPreventionInterceptor,
             multi: true,
         }
     ],
     ...
 })
 export class AppModule { }
```

## AddLangParamInterceptor
This interceptor is used to add the current user language as a parameter to your request if needed. Of course, this has nothing to do with the Translation Service that we utilize. It's a standalone interceptor to provide flexibility for some API calls that need a language key to be passed. To use it, add the following at the `app.module.ts` file:

**app.module.ts**
```javascript
 ...
 import { HTTP_INTERCEPTORS } from '@angular/common/http';
 import { AddLangParamInterceptor } from '@eui/core';
 
 @NgModule({
     ...
     providers: [
         ...
         {
             provide: HTTP_INTERCEPTORS,
             useClass: AddLangParamInterceptor,
             multi: true,
         }
     ],
     ...
 })
 export class AppModule { }
```

To add the language as a parameter, please inject the HttpClient and pass the **LANG_PARAM_KEY** with the respective key that will be resolved as the query param to HTTP call.

```javascript
...
import { HttpClient } from '@angular/common/http';
import { LANG_PARAM_KEY } from '@eui/core';
...
@Injectable()
export class MyService {
    constructor(private http: HttpClient) {}
    ...
    getByLang(): Observable<any> {
        return this.http.get('/getByLanguage', { headers: {
            [LANG_PARAM_KEY]: 'lang',
        }
    }
}
```

If the current language is set to fr, the GET url will be **`/getByLanguage?lang=fr`**

<em>**BEWARE**</em>
> In case your query param e.g. /my\_http\_call?lang=undefined that means injected HttpClient doesn't have the HTTP_INTERCEPTORS you previously provided. You should keep in mind that CoreModule of '@eui/core' imports HttpClientModule which means that it creates an instance of the HttpClient. If you import the HttpClientModule into one of the modules that you are providing the Service/Component that utilizes the LANG\_PARAM\_KEY, then you will have another instance of the HttpClient. To fix that you need to tell Angular's DI mechanism to ignore the Child's injection and take the Father's one. The decorator you need to use is @SkipSelf(). So you can use it like:  
> constructor(@SkipSelf() private http: HttpClient) {...}

## EuLoginSessionTimeoutHandlingInterceptor
Checks all Ajax HTTP responses for the specific EU Login HTTP response that is sent when the authentication session has become invalid. When the authentication session is invalid, we need to re-authenticate. The browser refreshes the current URL and lets the EU Login client redirect to the official EU Login page. Preparatory step:

<em>**Important!!**</em>
> For the ECAS session timeout handling interceptor to work properly, the ECAS client needs to be configured to provide a proper error in JSON format. Add the following configuration to the ecas-config.xml file:
```xml
<client-config ...>
   ...
   <redirectionInterceptors>
       <redirectionInterceptor>eu.cec.digit.ecas.client.http.ajax.JsonAjaxRedirectionInterceptor</redirectionInterceptor>
   </redirectionInterceptors>
   ...
</client-config>
```

**Usage**

In the `app.module.ts` file, add the following:

**app.module.ts**
```javascript
 ...
 import { HTTP_INTERCEPTORS } from '@angular/common/http';
 import { EuLoginSessionTimeoutHandlingInterceptor } from '@eui/core';
 
 @NgModule({
     ...
     providers: [
         ...
         {
             provide: HTTP_INTERCEPTORS,
             useClass: EuLoginSessionTimeoutHandlingInterceptor,
             multi: true,
         }
     ],
     ...
 })
 export class AppModule { }
```

## Provide Interceptor whether is needed
The interceptor should only be provided if it is needed. You don't have to provide the interceptor for the entire module. You can provide it in a sub-module or even in a component itself. Below you can find an example for that.

```javascript
...
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddLangParamInterceptor } from '@eui/core';

@Component({
    ...
    providers: [
        ...
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddLangParamInterceptor,
            multi: true,
        }
    ],
    ...
})
export class MyComponent {
    constructor(private http: HttpClient) {}
    ...
    getByLang(): Observable<any> {
        return this.http.get('/getByLanguage', { headers: {
            [LANG_PARAM_KEY]: 'lang',
        }
    }
}
```
[//]: # (TODO: Fix the stackblitz example)
[//]: # (<em>**Experimental**</em>)
[//]: # (> <iframe width="100%" height="300px" src="https://stackblitz.com/edit/sb-http-interceptors?embed=1&file=src/app/app.module.ts&hideNavigation=1"></iframe>)
