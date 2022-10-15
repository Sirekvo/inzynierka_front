import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {ChangeFormStatusInput, CreateFormInput, FormListItemOutput, FormOutput, UpdateFormInput} from '../models/form.model';

@Injectable()
export class FormService {

    constructor(private httpClient: HttpClient) {
    }

    getForm(id: bigint): Observable<FormOutput> {
        return this.httpClient.get<FormOutput>(environment.apiUrl + 'forms/' + id);
    }

    getForms(): Observable<Array<FormListItemOutput>> {
        return this.httpClient.get<Array<FormListItemOutput>>(environment.apiUrl + 'forms');
    }

    createForm(model: CreateFormInput): Observable<bigint> {
        return this.httpClient.post<bigint>(environment.apiUrl + 'forms', model);
    }

    updateForm(model: UpdateFormInput): Observable<FormOutput> {
        return this.httpClient.put<FormOutput>(environment.apiUrl + 'forms', model);
    }

    changeFormStatus(model: ChangeFormStatusInput): Observable<bigint> {
        return this.httpClient.put<bigint>(environment.apiUrl + 'forms/status', model);
    }

    setDefaultForm(id: bigint): Observable<bigint> {
        return this.httpClient.put<bigint>(environment.apiUrl + 'forms/default/' + id, null);
    }

    deleteForm(id: bigint): Observable<bigint> {
        return this.httpClient.delete<bigint>(environment.apiUrl + 'forms/' + id);
    }
}
