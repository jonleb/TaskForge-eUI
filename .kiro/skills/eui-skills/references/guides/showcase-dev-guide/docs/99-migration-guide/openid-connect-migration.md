# Migration OpenID Connect

If your project has been using the older eUI OpenID Connect implementation, there are 2 options. 

## Option 1: keep the old JavaScript implementation (implicit flow)

In order to keep the old JavaScript implementation, copy the following files:
* node_modules/jsrsasign/jsrsasign-all-min.js 
* node_modules/oidc-client/oidc-client.min.js 
* node_modules/@eui/base/assets/openid/openid-login.js

... to the src/assets/ folder.

Then, edit the index.html file and make sure that the JS files are imported correctly:
``` xml
    <script type="text/javascript" src="assets/jsrsasign-all-min.js"></script>
    <script type="text/javascript" src="assets/oidc-client.min.js"></script>
    <script type="text/javascript" src="assets/openid-login.js"></script>
```

After this, we need to make sure that the OpenIdConnectInterceptor is still there:
``` typescript
    import { Injectable } from '@angular/core';
    import {
        HttpErrorResponse,
        HttpEvent,
        HttpEventType,
        HttpHandler,
        HttpHeaders,
        HttpInterceptor,
        HttpRequest,
        HttpResponse,
    } from '@angular/common/http';
    import { Observable, of, Subject, Subscription, throwError } from 'rxjs';
    import { catchError } from 'rxjs/operators';
    
    // This variable is declared in the javascript file openid-login.js
    // and will be imported in the eUI applications' index.html file, when necessary.
    declare var OpenIdConnect: any;
    
    @Injectable()
    export class OpenIdConnectInterceptor implements HttpInterceptor {
        // By default, the original request should at least be retries once in case the cached API Gateway token expires:
        defaultMaximumRequestRetries = 1;
    
        constructor() {
            // check if the OpenIdConnect is defined
            if (typeof OpenIdConnect === 'undefined') {
                console.error(
                    'Please include the script openid-login.js in your index.html file.',
                    'For more details, please consult the documentation regarding the Http Interceptors and OpenID Connect configuration.',
                );
            }
        }
    
        intercept(
            request: HttpRequest<any>,
            next: HttpHandler,
            retryCount = 0,
            retryCallback?: Subject<HttpEvent<any>>,
        ): Observable<HttpEvent<any>> {
            if (typeof OpenIdConnect !== 'undefined') {
                let authorizedRequest = retryCallback;
                if (!authorizedRequest) {
                    authorizedRequest = new Subject<HttpEvent<any>>();
                }
    
                OpenIdConnect.getAuthorizationHeaders(request.urlWithParams, (headers: any) => {
                    let newRequest = request;
                    if (headers) {
                        let newHeaders = request.headers;
                        if (newHeaders) {
                            for (const headerName in headers) {
                                if (headers.hasOwnProperty(headerName)) {
                                    newHeaders = newHeaders.set(headerName, headers [headerName]);
                                }
                            }
                        } else {
                            newHeaders = new HttpHeaders(headers);
                        }
                        newRequest = request.clone({
                            withCredentials: false,
                            headers: newHeaders,
                        });
                    }
    
                    // Don't mix the next line with the line below it.
                    // We would get a "Cannot access 'subscription' before initialization" error.
                    let subscription = null;
                    subscription = next.handle(newRequest)
                        .pipe(
                            catchError((response: HttpErrorResponse) => {
                                return this.handleErrorResponse(response, request, next, retryCount, authorizedRequest, subscription);
                            }),
                        )
                        .subscribe((httpEvent: HttpResponse<any>) => {
                            if (httpEvent) {
                                authorizedRequest.next(httpEvent);
                                if (httpEvent.type === HttpEventType.Response) {
                                    if (subscription) {
                                        subscription.unsubscribe();
                                    }
                                    authorizedRequest.complete();
                                }
                            }
                        });
                }, (errorResponse: XMLHttpRequest) => {
                    const errorProperties: any = {
                        error: errorResponse,
                    };
                    if (errorResponse) {
                        errorProperties.status = errorResponse.status;
                        errorProperties.statusText = errorResponse.statusText;
                    }
    
                    return this.handleErrorResponse(new HttpErrorResponse(errorProperties), request, next, retryCount, authorizedRequest, null);
                });
    
                return authorizedRequest;
            } else {
                return next.handle(request);
            }
        }
    
        protected handleErrorResponse(
            response: HttpErrorResponse,
            originalRequest: HttpRequest<any>,
            next: HttpHandler,
            retryCount: number = 0,
            retryCallback: Subject<HttpEvent<any>>,
            subscription: Subscription,
        ): Observable<HttpEvent<any>> {
            if (response) {
                if (response.error && response.error.error === 'invalid_request') {
                    // The ID token is invalid or incorrect; retrieve another one:
                    OpenIdConnect.renewIdToken();
                } else if (this.apiGatewayTokenExpired(response)) {
                    OpenIdConnect.clearCachedApiGatewayAccessToken();
                    return this.retryRequest(originalRequest, response, next, retryCount, retryCallback, subscription);
                } else if (response.status === 401 || response.status === 403) {
                    // The EU Login access token is invalid. (403)
                    // The target service is unable to read the access token, for example because the EU Login session ended. (401)
                    // Retry in case the access token became invalid too quickly:
                    return this.retryRequest(originalRequest, response, next, retryCount, retryCallback, subscription);
                } else if (response.status === 0) {
                    // One of the access token requests or the original request was not sent.
                    // Most likely one of the CORS pre-flight requests failed, or the browser is offline.
                    console.warn(
                        'The OpenID Connect call may have issues:\n' +
                        '* the CORS pre-flight requests for the OpenID Connect access tokens or for the REST call could be failing\n' +
                        '* the browser could be currently offline.',
                    );
                }
            }
    
            if (subscription) {
                subscription.unsubscribe();
            }
            if (retryCallback) {
                retryCallback.error(response);
                retryCallback.complete();
            }
    
            return throwError(response);
        }
    
        protected retryRequest(
            originalRequest: HttpRequest<any>,
            response: HttpErrorResponse,
            next: HttpHandler,
            retryCount: number = 0,
            retryCallback: Subject<HttpEvent<any>>,
            subscription: Subscription,
        ): Observable<HttpEvent<any>> {
            if (retryCount < this.maximumRequestRetries()) {
                this.intercept(originalRequest, next, retryCount + 1, retryCallback);
            } else {
                console.error(
                    'The OpenID Connect call may have issues:\n' +
                    '* the client ID could be invalid\n' +
                    '* the API Gateway access token could be invalid\n' +
                    '* the EU Login access token for the target service could be invalid.',
                );
                if (subscription) {
                    subscription.unsubscribe();
                }
                if (retryCallback) {
                    retryCallback.error(response);
                    retryCallback.complete();
                }
            }
    
            return of<HttpEvent<any>>(null);
        }
    
        protected apiGatewayTokenExpired(response: HttpErrorResponse): boolean {
            if (response && response.status === 401) {
                const message = '' + response.error;
                return message.indexOf('<ams:code>900901</ams:code>') >= 0;
            } else {
                return false;
            }
        }
    
        protected maximumRequestRetries(): number {
            if (OpenIdConnect.config && OpenIdConnect.config.maximumRequestRetries >= 0) {
                return OpenIdConnect.config.maximumRequestRetries;
            } else {
                return this.defaultMaximumRequestRetries;
            }
        }
    }
```

And make sure its active by adding it in the core.module.ts:

```typescript
    {
        provide: HTTP_INTERCEPTORS,
        useClass: OpenIdConnectInterceptor,
        multi: true,
    },
```

## Option 2: migrate to the server-side login service (code flow)

The new implementation involves a backend login service. It will remove all tokens away from the browser and let it be handled by server-side code and by using secure session cookies instead.

This new implementation is considered more secure and should be used.

The documentation on how to install and configure this login service, please read the readme.md file from the reference implementation:
https://citnet.tech.ec.europa.eu/CITnet/stash/projects/APIGTW/repos/openid-connect-bff-reference-implementation/browse
