import { Component, OnInit } from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../shared/models/post.model";
import {PostService} from "../../../shared/services/post.service";
import firebase from "firebase/compat";
import app = firebase.app;
import {UrlInput} from "../../../shared/models/image.model";
import {AccountOutput} from "../../../shared/models/user.model";
import {UserService} from "../../../shared/services/user.service";

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
    newPostList: Array<PostInputByTitle>;
    role: string;

    constructor(private postService: PostService,
                private userService: UserService) { }

    ngOnInit(): void {
        this.postService.getPost().subscribe(
            (post: Array<PostInput>) => {
                this.postList = post;
            },
            () => {
            }

        );
        this.userService.getInformationAboutUser().subscribe(
            (information: AccountOutput) => {
                this.role = information.role;
            }
        )
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
