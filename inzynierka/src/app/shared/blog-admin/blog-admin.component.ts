import { Component, OnInit, Input } from '@angular/core';
import {PostInput} from "../models/post.model";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit {

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
