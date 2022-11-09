import { Component, OnInit, Input } from '@angular/core';
import {PostInput} from "../models/post.model";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit {

  @Input() blogData: Array<{
    image: string;
    title: string;
    like: string;
    message: string;
    name: string;
    date: string;
  }>;

  postList: Array<PostInput>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe(
        (post: Array<PostInput>) => {
          this.postList = post;
        },
        () => {
        }

    );
  }
  deletePost(id){
    this.postService.deletePost(id).subscribe(
        (result) => {
          this.ngOnInit();
        },
    );
  }




}
