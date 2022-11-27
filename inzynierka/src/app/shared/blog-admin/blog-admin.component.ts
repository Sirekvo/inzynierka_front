import {Component, OnInit, Input, Type} from '@angular/core';
import {PostInput, PostInputByTitle} from "../models/post.model";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";
import {ModalDismissReasons, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Usuwanie posta</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title"
                (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p><strong>Czy na pewno chcesz usunąć ten post?</strong>
        </p>
          <span class="text-danger">Tej operacji nie można cofnąć.</span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Anuluj</button>
        <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Potwierdź
        </button>
      </div>
    `
})

export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {
  }
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm,
  // autofocus: NgbdModalConfirmAutofocus
};
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
  @Input() view: number;

  web = true;
  mobile = false;

  constructor(private postService: PostService,
              private router: Router,
              private _modalService: NgbModal) { }

  ngOnInit(): void {
    if (window.innerWidth <= 991) { // 768px portrait
      this.mobile = true;
      this.web = false;
    }
    window.onresize = () => this.mobile = window.innerWidth <= 991;
  }

  editPost(id: number){
    this.router.navigate(['/post-edition', id]);
  }
  open(name: string, id: number) {
    this._modalService.open(MODALS[name]).result.then((result) => {
      if (result == 'Ok click') {
        this.postService.deletePost(id).subscribe(
            (result) => {
              this.ngOnInit();
            },
        );
      }
    }, (reason) => {
      if (reason === ModalDismissReasons.ESC ||
          reason === ModalDismissReasons.BACKDROP_CLICK ||
          reason == 'cancel click' ||
          reason == 'Cross click') {
      }
    });
  }
  showPost(id: number){
    this.router.navigate(['/post-detail', id]);
  }
  onResize(event) {
    if (event.target.innerWidth <= 991) { // 768px portrait
      this.web = false;
      this.mobile = true;
    }else{
      this.web = true;
      this.mobile = false;
    }
  }

}
