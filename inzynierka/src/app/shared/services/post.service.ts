import {HttpClient, HttpHeaders, HttpBackend} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {PostInput, PostInputById, PostInputByTitle, PostOutput} from "../models/post.model";



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

    createPost(title: string, creator: string, genre: string, production: string, premiere: string, description: string, url: string): Observable<any> {

        const body = {
            title,
            creator,
            genre,
            production,
            premiere,
            description,
            url
        };
        return this.httpClient_withoutToken.post(environment.apiUrl + '/series', body);
    }
    editPost(series_id: number,title: string, creator: string, genre: string, production: string, premiere: string, description: string, url: string): Observable<any> {

        const body = {
            series_id,
            title,
            creator,
            genre,
            production,
            premiere,
            description,
            url
        };

        return this.httpClient_withoutToken.put(environment.apiUrl + '/change-post', body);
    }
    deletePost(id : number): Observable<any> {
        return this.httpClient_withoutToken.delete(environment.apiUrl + '/series/' + id);
    }
    getPostById(id : number): Observable<PostInputById> {
        return this.httpClient_withoutToken.get<PostInputById>(environment.apiUrl + '/series/' + id);
    }
    getPostByTitle(title : string): Observable<Array<PostInputByTitle>> {
        return this.httpClient_withoutToken.get<Array<PostInputByTitle>>(environment.apiUrl + '/findBy/' + title);
    }

}
