# eUI Breadcrumb Component Customization Guide

This guide provides detailed instructions on how to implement a custom breadcrumb logic in your application using Angular's Router and a standalone `EuiBreadcrumbService`. The eUI breadcrumb component has been revamped for eUI 10, moving away from the Application shell to a standalone component. The previous breadcrumbs service, which used Angular's Router injected services to parse route metadata, is no longer available. However, you can recreate similar functionality by following this guide.
The aforementioned component can be found [here](https://eui.ecdevops.eu/eui-showcase-ux-components-17.x/style-guide/layout-components/eui-breadcrumb).

## EuiBreadcrumbService Implementation

The `EuiBreadcrumbService` is a singleton service designed to generate breadcrumb data dynamically based on your application's routing structure and needs. The service declaration is as follows:

### Service Declaration
```javascript

@Injectable({
providedIn: 'root',
})
export class EuiBreadcrumbService {
/**
* A behavior subject to emit breadcrumb whenever that changes
*/
public IbreadcrumbsSource$: BehaviorSubject<IBreadcrumb[]> = new BehaviorSubject<IBreadcrumb[]>([]);
private _defaultResolver = new Resolver();

    constructor(private _router: Router, route: ActivatedRoute, private _injector: Injector) {
        this._router.events
            .pipe(filter((x) => x instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {

                const currentRoot = _router.routerState.snapshot.root;

                this._resolveCrumbs(currentRoot).pipe(
                    flatMap((x) => x),
                    distinct((x) => x.text),
                    toArray(),
                    flatMap((x) => {
                        return of(x);
                    }))
                    .subscribe((x) => {
                        this.IbreadcrumbsSource$.next(x);
                    });
            });
    }

    isPromise(value: any): boolean {
        return value && (typeof value.then === 'function');
    }

    wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {

        if (value instanceof Observable) {
            return value;
        }

        if (this.isPromise(value)) {
            return from(Promise.resolve(value));
        }

        return of(value as T);
    }

    get crumbs$(): Observable<IBreadcrumb[]> {
        return this.IbreadcrumbsSource$.asObservable();
    }

    private _resolveCrumbs(route: ActivatedRouteSnapshot): Observable<IBreadcrumb[]> {

        let crumbs$: Observable<IBreadcrumb[]>;

        const data = route.routeConfig?.data;

        if (data?.breadcrumbs) {

            let resolver: Resolver;

            if (data.breadcrumbs.prototype instanceof Resolver) {
                resolver = this._injector.get(data.breadcrumbs);
            } else {
                resolver = this._defaultResolver;
            }

            const result = resolver.resolve(route, this._router.routerState.snapshot);
            crumbs$ = this.wrapIntoObservable<IBreadcrumb[]>(result).pipe(first());

        } else {
            crumbs$ = of([]);
        }

        if (route.firstChild) {
            crumbs$ = crumbs$.pipe(concat(this._resolveCrumbs(route.firstChild)));
        }

        return crumbs$;
    }
}
```

### Key Features

- **Dynamic Breadcrumb Construction**: Utilizes Angular's Router to listen to navigation events and construct breadcrumbs based on the current route.
- **Custom Resolver Integration**: Allows for the use of custom resolvers to determine breadcrumb data, providing flexibility in breadcrumb content.
- **Observable Breadcrumbs**: The breadcrumbs are exposed as an observable, making it easy to react to changes in the breadcrumb trail.

## Resolver for Custom Breadcrumb Data

The `Resolver` class is crucial for customizing breadcrumb content based on route metadata.

### Resolver Implementation

```javascript
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

interface IBreadcrumb {
    text: string;
    path: string;
}

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export class Resolver implements Resolve<IBreadcrumb[]> {

    stringFormat(template: string, binding: any): string {
        const compiled = _.template(template);
        return compiled(binding);
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBreadcrumb[]> | Promise<IBreadcrumb[]> | IBreadcrumb[] {

        // route's metadata
        const data = route.routeConfig.data;
        // retrieve full path as a string
        const path = this.getFullPath(route);

        /** check the type of the breadcrumbs property of the route's metadata
         * if it's a string, then it's a template string that needs to be compiled
         * e.g. 'Home / {{title}}'
         */
        let text = typeof (data.breadcrumbs) === 'string' ? data.breadcrumbs : data.breadcrumbs.text || data.text || path;
        text = this.stringFormat(text, route.data);

        const crumbs: IBreadcrumb[] = [{
            text: text,
            path: path
        }];

        // return the breadcrumb as an array
        return of(crumbs);
    }

    /**
     * Retrieve full path from given route as a string e.g. /parent/child
     * @param route Contains the information about a route associated with a component loaded in an outlet at a
     *      particular moment in time. ActivatedRouteSnapshot can also be used to traverse the router state tree.
     */
    public getFullPath(route: ActivatedRouteSnapshot): string {
        const relativePath = (segments: UrlSegment[]) => segments.reduce((path, url) => path += '/' + url.path, '');
        // construct the full path by getting UrlSegments from the root of the route tree and constructing the string through a reducer
        const fullPath = (routes: ActivatedRouteSnapshot[]) => routes.reduce((path, snap) => path += relativePath(snap.url), '');

        return fullPath(route.pathFromRoot);
    }
}
```

### Functionality

- **Template String Interpolation**: Supports the use of template strings in route metadata to dynamically generate breadcrumb text.
- **FullPath Retrieval**: Provides a method to retrieve the full path of a route, which can be used as part of the breadcrumb.

## Route Metadata Declaration

The route metadata is where you define the breadcrumb text and the resolver for a particular route. Below are some examples of how to declare this metadata:

**Static String**
```json
{
    path: 'components',
    component: MyComponent,
    data: {
        breadcrumbs: 'Components'
    }
}
```
**Using URL Fragment**
```json
{
    path: 'components',
    component: MyComponent,
    data: {
        breadcrumbs: true
    }
}
```
**Interpolating Values with Custom Resolver**
```json
{
    path: 'components',
    component: MyComponent,
    data: {
        breadcrumbs: '{{ component.name }}'
    },
    resolve: {
        component: MyCustomResolver
    }
}
```

## Conclusion

This guide provides a comprehensive approach to implementing a custom breadcrumb logic in Angular applications using the `EuiBreadcrumbService` and `Resolver`. By following these instructions, you can create a dynamic and flexible breadcrumb component tailored to your application's specific routing and data needs.
