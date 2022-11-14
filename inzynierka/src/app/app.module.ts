import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, Pipe} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgxMasonryModule } from 'ngx-masonry';



import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { IndexBlogComponent } from './core/components/index-blog/index-blog.component';
import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MasterPageComponent} from "./core/components/master-page/master-page.component";
import {PageBlogDetailComponent} from "./core/components/page-blog-detail/page-blog-detail.component";
import {PageBlogListSidebarComponent} from "./core/components/page-blog-list-sidebar/page-blog-list-sidebar.component";
import {PageBlogSidebarComponent} from "./core/components/page-blog-sidebar/page-blog-sidebar.component";
import {PageBlogListComponent} from "./core/components/page-blog-list/page-blog-list.component";
import {AuthLoginComponent} from "./auth/auth-login/auth-login.component";
import {UserService} from "./shared/services/user.service";
import {AuthInterceptorProvider} from "./shared/interceptor/auth.interceptor";
import {HttpClientModule} from "@angular/common/http";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {ImageComponent} from "./core/components/images/image/image.component";
import {ImageListComponent} from "./core/components/images/image-list/image-list.component";
import {ImagesComponent} from "./core/components/images/images.component";
import {AdminPanelComponent} from "./core/components/admin-panel/admin-panel.component";
import {
  NgbdModalConfirm,
  PageBlogDetailTwoComponent
} from "./core/components/page-blog-detail-two/page-blog-detail-two.component";
import {PostService} from "./shared/services/post.service";
import {NgPipesModule} from "ngx-pipes";
import {BlogAdminComponent} from "./shared/blog-admin/blog-admin.component";
import {PostEditionComponent} from "./core/components/post-edition/post-edition.component";
import {SliderEditorComponent} from "./core/components/admin-settings/slider-editor/slider-editor.component";
import {SlidersComponent} from "./shared/sliders/sliders.component";


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    MasterPageComponent,
    PageBlogDetailComponent,
    PageBlogDetailTwoComponent,
    PageBlogListSidebarComponent,
    PageBlogSidebarComponent,
    PageBlogListComponent,
    AuthLoginComponent,
    AppComponent,
    FooterComponent,
    IndexBlogComponent,
    ImagesComponent,
    ImageComponent,
    ImageListComponent,
    AdminPanelComponent,
    NgbdModalConfirm,
    BlogAdminComponent,
    PostEditionComponent,
    SliderEditorComponent,
    SlidersComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    ScrollToModule.forRoot(),
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    NgxYoutubePlayerModule,
    NgbDropdownModule,
    CKEditorModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    SwiperModule,
    NgxTypedJsModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    HttpClientModule,
    NgxMasonryModule,
    LightboxModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    NgPipesModule,

  ],
  exports: [
    FeatherModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthInterceptorProvider, UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
