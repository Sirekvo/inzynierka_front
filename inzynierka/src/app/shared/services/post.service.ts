import {HttpClient, HttpHeaders, HttpBackend} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {CommentsInput, PostInput, PostInputById, PostInputByTitle, PostOutput} from "../models/post.model";
import {UrlInput} from "../models/image.model";



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

    createPost(title: string, creator: string, genre: string, production: string, premiere: string, description: string, url: string,post_creator: string, creation_date: string): Observable<any> {

        const body = {
            title,
            creator,
            genre,
            production,
            premiere,
            description,
            url,
            post_creator,
            creation_date
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
            url,

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
    sendSliderUrl(sliderList : Array<UrlInput>): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.httpClient_withoutToken.post(environment.apiUrl + '/sliders', JSON.stringify(sliderList), httpOptions)
    }
    getSliderUrl(): Observable<Array<UrlInput>> {
        return this.httpClient_withoutToken.get<Array<UrlInput>>(environment.apiUrl + '/sliders')
    }
    postComment(creator: string, comment: string, serie_id: number, date: string): Observable<any>{
        const body = {
            creator,
            comment,
            serie_id,
            date
        }
        return this.httpClient_withoutToken.post(environment.apiUrl + '/comment', body);
    }
    getComments(serie_id: number): Observable<Array<CommentsInput>>{

        return this.httpClient_withoutToken.get<Array<CommentsInput>>(environment.apiUrl + '/comment/' + serie_id);
    }
    deleteComment(comment_id: number): Observable<any>{
        return this.httpClient_withoutToken.delete(environment.apiUrl + '/comment/' + comment_id)
    }
    editSlider(url: string, slider_id: number): Observable<any>{
        const body ={
            url,
            slider_id
        }
        return this.httpClient_withoutToken.put(environment.apiUrl + '/sliders', body);
    }
    deleteSlider(slider_id: number): Observable<any>{
        return this.httpClient_withoutToken.delete(environment.apiUrl + '/sliders/' + slider_id);
    }
}
