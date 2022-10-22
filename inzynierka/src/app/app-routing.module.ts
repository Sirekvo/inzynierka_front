import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexBlogComponent } from './core/components/index-blog/index-blog.component';

import { SwitcherComponent } from './shared/switcher/switcher.component';

import { combineLatest } from 'rxjs/internal/operators';
import {MasterPageComponent} from "./core/components/master-page/master-page.component";
import {PageBlogDetailComponent} from "./core/components/page-blog-detail/page-blog-detail.component";

const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      { path: '', component: IndexBlogComponent },
      { path: 'page-blog-detail', component: PageBlogDetailComponent},
      { path: '#', component: SwitcherComponent },
    ]
  },

  //{ path: 'auth-login', component: AuthLoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled",
  scrollOffset: [0, 0],
  // Enable scrolling to anchors
  anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
