import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, catchError, delay, filter } from 'rxjs';

import { CONFIG_TOKEN, handleError } from '@eui/core';

@Injectable()
export class TasksDataService {

    private url = 'assets/data/tasks.json';

    constructor( @Inject(CONFIG_TOKEN) protected config: any,
                 private http: HttpClient ) {
    }

    getData(loadingDelay?: number): Observable<Array<any>> {
        return this.http.get<any[]>(this.url).pipe(delay(loadingDelay), catchError(handleError));
    }

    getById(id: string): Observable<any> {
        const payload = this.http.get(this.url);

        return payload.pipe(filter( item => item[0].taskTypeId === id )).pipe(catchError(handleError));
    }
}
