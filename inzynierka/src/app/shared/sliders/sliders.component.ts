import { Component, OnInit, Input } from '@angular/core';
import {PostInput} from "../models/post.model";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sliders',
    templateUrl: './sliders.component.html',
    styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {

    @Input() urlList: Array<{
        url: string;
    }>;

    // postList: Array<PostInput>;

    constructor(private postService: PostService,
                private router: Router) { }

    ngOnInit(): void {
        // this.postService.getPost().subscribe(
        //     (post: Array<PostInput>) => {
        //       this.postList = post;
        //     },
        //     () => {
        //     }
        //
        // );
    }
    deletePost(id){
        this.postService.deletePost(id).subscribe(
            (result) => {
                this.ngOnInit();
            },
        );
    }
    editPost(id: number){
        this.router.navigate(['/post-edition', id]);
    }
}
