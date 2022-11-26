import { Component, OnInit } from '@angular/core';
import {PostInput} from "../../../shared/models/post.model";
import {PostService} from "../../../shared/services/post.service";
import {UrlInput} from "../../../shared/models/image.model";


@Component({
  selector: 'app-index-blog',
  templateUrl: './index-blog.component.html',
  styleUrls: ['./index-blog.component.css']
})

/***
 * Blog Component
 */
export class IndexBlogComponent implements OnInit {

  showNavigationArrows = true;
  showNavigationIndicators = false;
  postList: Array<PostInput>;
  urlList: Array<UrlInput>;
  three = 3;
  slider_count: number;


  constructor(private postService: PostService) { }

  ngOnInit(): void {
      this.postService.getPost().subscribe(
          (post: Array<PostInput>) => {
              this.postList = post;
          },
          () => {
          }

      );
      this.postService.getSliderUrl().subscribe(
          (url: Array<UrlInput>) => {
              this.urlList = url;
              this.slider_count= url.length
          },
          () => {
          }

      );
  }

}
