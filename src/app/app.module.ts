import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { AppErrorHandler } from './common/app-error-handler';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { ShowBlogComponent } from './show-blog/show-blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AllBlogsComponent,
    CreateBlogComponent,
    EditBlogComponent,
    ShowBlogComponent,
    NotFoundComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AllBlogsComponent
      },
      {
        path: 'blogs',
        component: AllBlogsComponent
      },
      {
        path: 'blogs/create',
        component: CreateBlogComponent
      },
      {
        path: 'blogs/:id',
        component: ShowBlogComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
