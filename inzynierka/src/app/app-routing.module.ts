import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexBlogComponent } from './core/components/index-blog/index-blog.component';


import { combineLatest } from 'rxjs/internal/operators';
import {MasterPageComponent} from "./core/components/master-page/master-page.component";
import {PageBlogDetailComponent} from "./core/components/page-blog-detail/page-blog-detail.component";
import {AuthLoginComponent} from "./auth/auth-login/auth-login.component";
import {AdminPanelComponent} from "./core/components/admin-panel/admin-panel.component";
import {PostCreator} from "./core/components/post-creator/post-creator.component";
import {PostEditionComponent} from "./core/components/post-edition/post-edition.component";
import {SliderEditorComponent} from "./core/components/admin-settings/slider-editor/slider-editor.component";
import {NewRedactorComponent} from "./core/components/admin-settings/new-redactor/new-redactor.component";
import {AccountSettingsComponent} from "./core/components/account-settings/account-settings.component";


const routes: Routes = [
  {
    path: '',
    component: MasterPageComponent,
    children: [
      { path: '', component: IndexBlogComponent },

    ]
  },
  {path: 'login', component: AuthLoginComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'post-creator', component: PostCreator},
  {path: 'post-edition/:id', component:PostEditionComponent},
  {path: 'sliders', component: SliderEditorComponent},
  {path: 'new-redactor', component: NewRedactorComponent},
  {path: 'settings', component: AccountSettingsComponent},
  { path: 'post-detail/:id', component: PageBlogDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled",
  scrollOffset: [0, 0],
  // Enable scrolling to anchors
  anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
