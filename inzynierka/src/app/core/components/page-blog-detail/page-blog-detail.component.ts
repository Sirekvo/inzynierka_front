import { Component, OnInit } from '@angular/core';
import {CommentsInput, PostInputById} from "../../../shared/models/post.model";
import {NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {PostService} from "../../../shared/services/post.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-page-blog-detail',
  templateUrl: './page-blog-detail.component.html',
  styleUrls: ['./page-blog-detail.component.css']
})

export class PageBlogDetailComponent implements OnInit {

  id: number;
  title: string;
  creator: string;
  production: string;
  description: string;
  premiere: string;
  genre: string;
  downloadUrl: string;
  submitted = false;
  commentForm: FormGroup;

  commentsList: Array<CommentsInput>;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
    }, {});

    this.id = parseFloat(this.route.snapshot.paramMap.get('id'));
    this.postService.getPostById(this.id).subscribe(
        (post: PostInputById) => {
          this.title = post.title;
          this.creator = post.creator;
          this.description = post.description;
          this.production = post.production;
          this.downloadUrl = post.url;
          this.genre = post.genre;
          this.premiere = post.premiere;

        },
        () => {
        }

    );
      this.postService.getComments(this.id).subscribe(
          (post: Array<CommentsInput>) => {
              this.commentsList = post;
          },
          () => {
          }

      );
  }
  fComment(){
      return this.commentForm.controls;
  }

  addComment(form){
      this.submitted = true;
      if(this.commentForm.invalid){
          return;
      }
      else{
          const currentTime = Intl.DateTimeFormat().resolvedOptions().timeZone.toString()
          this.postService.postComment(form.value.creator, form.value.comment, this.id, currentTime).subscribe(
              (resolve) => {
                  this.submitted = false;
                  form.reset();
              },
              () => {
                  this.submitted = false;
              }
          )
      }
  }
}
