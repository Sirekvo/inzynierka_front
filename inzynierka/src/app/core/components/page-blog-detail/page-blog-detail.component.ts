import { Component, OnInit } from '@angular/core';
import {CommentsInput, PostInputById} from "../../../shared/models/post.model";
import {NgbDate, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {PostService} from "../../../shared/services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountOutput} from "../../../shared/models/user.model";
import {UserService} from "../../../shared/services/user.service";

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
  role = '';
  post_creator: string;
  date: string;

  commentsList: Array<CommentsInput>;

  constructor(private postService: PostService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

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
          this.post_creator = post.post_creator;
          this.date = post.creation_date;
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
      this.userService.getInformationAboutUser().subscribe(
          (information: AccountOutput) => {
              this.role = information.role;
          }
      )
  }
  get fComment(){
      return this.commentForm.controls;
  }

  addComment(form){
      this.submitted = true;
      if(this.commentForm.invalid){
          return;
      }
      else{
          const now = new Date();

          this.postService.postComment(form.value.name, form.value.comment, this.id, now.toLocaleString()).subscribe(
              (resolve) => {
                  this.submitted = false;
                  form.reset();
                  this.ngOnInit()
              },
              () => {
                  this.submitted = false;
              }
          )
      }
  }
  back(){
      if(this.role == ''){
          this.router.navigate(['/']);
      }else{
          this.router.navigate(['/admin']);
      }
  }
  deleteComment(id: number){
      this.postService.deleteComment(id).subscribe(
          (resolve) => {
              this.ngOnInit()
          }
      )
  }
}
