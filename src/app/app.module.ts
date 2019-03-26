import { DataService } from './services/data.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { AppErrorHandler } from './common/app-error-handler';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { ShowBlogComponent } from './show-blog/show-blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AllBlogsComponent,
    CreateBlogComponent,
    EditBlogComponent,
    ShowBlogComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: AllBlogsComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'blogs',
        component: AllBlogsComponent
      },
      {
        path: 'blogs/create',
        component: CreateBlogComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'blogs/:id',
        component: ShowBlogComponent
      },
      {
        path: 'blogs/:id/edit',
        component: EditBlogComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AuthService,
    AuthGuard,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
