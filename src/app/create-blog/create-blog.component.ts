import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {

  constructor(
    private service: DataService,
    private router: Router) { }

  blog: object;

  onSubmit(form) {
    this.objectifyForm(form);
    this.service.create(this.blog)
      .subscribe(
        newBlog => {
          this.router.navigate(['/blogs/' + newBlog.blog._id]);
        }
      );
  }

  objectifyForm(form) {
    this.blog = {
      title: form.controls.blogTitle.value,
      subtitle: form.controls.blogSubtitle.value,
      image: form.controls.blogImage.value,
      body: form.controls.blogBody.value,
    };
  }
}
