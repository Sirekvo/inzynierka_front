import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';

import { ScrollspyDirective } from './scrollspy.directive';
import { FeatherModule } from 'angular-feather';
import { BlogComponent } from './blog/blog.component';
@NgModule({
  declarations: [
    ScrollspyDirective,
    BlogComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    FeatherModule,
    RouterModule
  ],
  exports: [
    ScrollspyDirective,
    BlogComponent,
  ]
})

export class SharedModule { }
