import {Component, HostListener, OnInit} from '@angular/core';
import {PostInput, PostInputByTitle} from "../../../shared/models/post.model";
import {PostService} from "../../../shared/services/post.service";
import firebase from "firebase/compat";
import app = firebase.app;
import {UrlInput} from "../../../shared/models/image.model";
import {AccountOutput} from "../../../shared/models/user.model";
import {UserService} from "../../../shared/services/user.service";
import {debounceTime, map} from "rxjs/operators";
import {fromEvent} from "rxjs";

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css'],
})


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
    mobile = false;
    isVisible_list = true;
    activeToggle = 1;
    checked = false;
    checked2= false;

    constructor(private postService: PostService,
                private userService: UserService) { }

    ngOnInit(): void {
        if (window.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }else{
            this.mobile = false;
        }

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
                this.activeToggle = information.view;
                if(this.activeToggle == 1){
                    this.checked = true
                }else{
                    this.checked2 = true;
                }
            }
        )

    }

    onResize(event) {
        if (event.target.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
        }else{
            this.mobile = false;
        }
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
    checkSelected() {
        this.activeToggle = 1;
        this.checked = true;
        this.checked2 = false;
        this.userService.changeView(1).subscribe(
            () =>{

            }
        )
    }
    checkSelected2() {
        this.activeToggle = 2;
        this.checked = false;
        this.checked2 = true;
        this.userService.changeView(2).subscribe(
            () =>{

            }
        )
    }
}
