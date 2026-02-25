# Http Interceptors

## Overview
The eUI provides some HTTP interceptors to take some of the burdens from Developers of an eUI application. Those are CachePreventionInterceptor, CorsSecurityInterceptor, CsrfPreventionInterceptor, AddLangParamInterceptor, EuLoginSessionTimeoutHandlingInterceptor and OpenIdConnectInterceptor. These interceptors are related mostly to the Security of an eUI application and integration of EU Login.

## Getting started
To use those interceptors, just provide them at the Root module of your eUI application. All those interceptors are available from the **@eui/core** package. Below you'll find detailed information for each interceptor and how to provide it. You should keep in mind that in case there is a proxy between the communication of the SPA and the API server it may alter the HTTP headers.

## CachePreventionInterceptor
Asks the intermediate proxies not to return a **cached** copy of the resource. This forces each server in the chain to validate the freshness of the resource. What actually, that interceptor doing is to alter the HTTP headers and set the **Cache-Control** to **No-cache**. To use this interceptor, add the following:

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

**Potential deprecation notice**

There future option for authenticating REST services is to use OpenID Connect. This involves requesting Access Tokens that are sent as headers. Since the OpenID Connect is set up to be _fully stateless_, there is no longer a need to renew sessions; a valid ID token will suffice.

These all mean that when using OpenID Connect, the HttpInterceptor can become useless.

## OpenIdConnectInterceptor
For more information about this interceptor, please refer to the [OpenID Connect integration guide](https://webgate.ec.europa.eu/fpfis/wikis/display/eUI/OpenID+Connect+integration).
