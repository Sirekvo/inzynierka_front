import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexBlogComponent } from './core/components/index-blog/index-blog.component';


import { combineLatest } from 'rxjs/internal/operators';
import {MasterPageComponent} from "./core/components/master-page/master-page.component";
import {PageBlogDetailComponent} from "./core/components/page-blog-detail/page-blog-detail.component";
import {AuthLoginComponent} from "./auth/auth-login/auth-login.component";
import {ImageComponent} from "./core/components/images/image/image.component";
import {ImageListComponent} from "./core/components/images/image-list/image-list.component";
import {ImagesComponent} from "./core/components/images/images.component";
import {AdminPanelComponent} from "./core/components/admin-panel/admin-panel.component";
import {PageBlogDetailTwoComponent} from "./core/components/page-blog-detail-two/page-blog-detail-two.component";
import {BlogComponent} from "./shared/blog/blog.component";

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      { path: '', component: IndexBlogComponent },
      { path: 'page-blog-detail', component: PageBlogDetailComponent},
    ]
  },
  {path: 'login', component: AuthLoginComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'post-creator', component: PageBlogDetailTwoComponent},
  {path: 'image', component: ImagesComponent,children:[
      {path:'upload', component: ImageComponent},
      {path:'list', component: ImageListComponent}
    ]},
  {path: 'blog', component: BlogComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled",
  scrollOffset: [0, 0],
  // Enable scrolling to anchors
  anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
