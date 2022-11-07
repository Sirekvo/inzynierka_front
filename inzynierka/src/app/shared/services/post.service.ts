import {HttpClient, HttpHeaders, HttpBackend} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {PostInput, PostOutput} from "../models/post.model";



@Injectable()
export class PostService {

    constructor(handler: HttpBackend,
                private httpClient: HttpClient,
                private httpClient_withoutToken: HttpClient) {
        this.httpClient_withoutToken = new HttpClient(handler);
    }

    getPost(): Observable<Array<PostInput>> {
        return this.httpClient_withoutToken.get<Array<PostInput>>(environment.apiUrl + '/series');
    }

    createPost(title: string, creator: string, genre: string, production: string, premiere: string, description: string,): Observable<any> {

        const body = {
            title,
            creator,
            genre,
            production,
            premiere,
            description
        };

        const httpOptions = {
            headers: new HttpHeaders({ 'Accept': 'application/json', 'Content-Type': 'application/json' })
        };

        return this.httpClient_withoutToken.post(environment.apiUrl + '/series', body);
    }

}
