import { Component, OnInit, Input } from '@angular/core';
import {PostInput} from "../models/post.model";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";

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


    web = true;
    mobile = false;

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

    }
    showPost(id: number){
        this.router.navigate(['/post-detail', id]);
    }




}
