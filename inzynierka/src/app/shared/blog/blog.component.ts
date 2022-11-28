import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {CommentsInput, PostInput} from "../models/post.model";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    @Input() postList: Array<{
        series_id: number;
        title: string;
        creator: string;
        genre: string;
        production: string;
        premiere: string;
        description: string;
        url: string;
    }>;
    @Input() howMany: number;
    @Output() pageChange: EventEmitter<number>;
    @Output() pageBoundsCorrection: EventEmitter<number>;
    page=1;
    pagesize=6;
    web = true;
    mobile = false;
    shouldDoIt = true;
    commentsCounter = 0;
    colleges: any[] = [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }, { name: "5" }, { name: "6" }, { name: "7" }, { name: "8" }, { name: "9" }, { name: "10" }, { name: "11" }, { name: "12" }, { name: "13" }];

    filteredArray: any[] = []

    constructor(private postService: PostService,
                private router: Router) { }

    ngOnInit(): void {
        if (window.innerWidth <= 991) { // 768px portrait
            this.mobile = true;
            this.web = false;
            if(this.howMany==3){
                this.howMany=2;
            }
        }
        window.onresize = () => this.mobile = window.innerWidth <= 991;

    }
    showPost(id: number){
        this.router.navigate(['/post-detail', id]);
    }
    onResize(event) {
        if (event.target.innerWidth <= 991) { // 768px portrait
            this.web = false;
            this.mobile = true;
            if(this.howMany==3){
                this.howMany=2;
            }
        }else{
            this.web = true;
            this.mobile = false;
            if(this.howMany==2){
                this.howMany=3;
            }
        }
    }


    callFunction(id: number) {
        console.log(id);
        this.postService.getComments(id).subscribe(
            (post: Array<CommentsInput>) => {
                this.commentsCounter = post.length;
                return this.commentsCounter;
            },
            () => {
            }

        );
    }
    onPaginateChange(data) {
        this.filteredArray = this.colleges.slice(0, data.pageSize);
    }
}
