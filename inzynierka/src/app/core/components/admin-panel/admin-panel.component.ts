import { Component, OnInit } from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../shared/models/post.model";
import {PostService} from "../../../shared/services/post.service";
import firebase from "firebase/compat";
import app = firebase.app;
import {UrlInput} from "../../../shared/models/image.model";

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})

/***
 * Blog Component
 */
export class AdminPanelComponent implements OnInit {

    /***
     * Nav bg light calss Add
     */
    navClass = 'bg-white';

    /***
     * Main Slider navigation Add
     */
    showNavigationArrows = true;
    showNavigationIndicators = false;
    postList: Array<PostInput>;
    urlList: Array<UrlInput>;
    newPostList: Array<PostInputByTitle>;

    constructor(private postService: PostService) { }

    ngOnInit(): void {
        this.postService.getSliderUrl().subscribe(
            (url: Array<PostInput>) => {
                this.urlList = url;
                console.log("udalo sie");
            },
            () => {
            }

        );
        this.postService.getPost().subscribe(
            (post: Array<PostInput>) => {
                this.postList = post;
                console.log("to tez udalo sie");
            },
            () => {
            }

        );
    }
    findByTitle(form){
        if(form.value.title){
            this.postService.getPostByTitle(form.value.title).subscribe(
                (post: Array<PostInputByTitle>) => {
                    this.postList = post;
                },
                () => {
                }
            );
        }
        else{
            this.ngOnInit()
        }

    }

}
