import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {CreateStyleInput, StyleListItemOutput, StyleOutput, UpdateStyleInput} from '../models/style.model';

@Injectable()
export class StyleService {

    public generatedStyleFile: string = null;

    constructor(private httpClient: HttpClient) {
    }

    getStyles(): Observable<Array<StyleListItemOutput>> {
        return this.httpClient.get<Array<StyleListItemOutput>>(environment.apiUrl + 'styles');
    }

    get(id: bigint): Observable<StyleOutput> {
        return this.httpClient.get<StyleOutput>(environment.apiUrl + 'styles/' + id);
    }

    create(model: CreateStyleInput): Observable<bigint> {
        return this.httpClient.post<bigint>(environment.apiUrl + 'styles', model);
    }

    update(model: UpdateStyleInput): Observable<bigint> {
        return this.httpClient.put<bigint>(environment.apiUrl + 'styles', model);
    }

    delete(id: bigint): Observable<bigint> {
        return this.httpClient.delete<bigint>(environment.apiUrl + 'styles/' + id);
    }
}
