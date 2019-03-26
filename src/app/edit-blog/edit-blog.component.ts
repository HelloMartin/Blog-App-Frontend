import { BlogInterface } from './../Interfaces/blog.interface';
import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  
  constructor(
    private service: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  blog: BlogInterface;

  form = new FormGroup({
    blogTitle: new FormControl('', Validators.required),
    blogSubtitle: new FormControl('', Validators.required),
    blogImage: new FormControl('', Validators.required),
    blogBody: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');      

        this.service.get(id)
          .subscribe(response => {
            this.blog = response.blog;
            this.form.get("blogTitle").setValue(this.blog.title);
            this.form.get("blogSubtitle").setValue(this.blog.subtitle);
            this.form.get("blogImage").setValue(this.blog.image);
            this.form.get("blogBody").setValue(this.blog.body);
          });
      })
  }

  onSubmit(form) {
    this.objectifyForm(form);
    
    this.service.update(this.blog)
      .subscribe(
        newBlog => {
          this.router.navigate(['/blogs/' + this.blog._id]);
        }
      )
  }

  objectifyForm(form) {
    this.blog = {
      _id: this.blog._id,
      title: form.controls.blogTitle.value,
      subtitle: form.controls.blogSubtitle.value,
      image: form.controls.blogImage.value,
      body: form.controls.blogBody.value
    }
  }

  get blogTitle() {
    return this.form.get('blogTitle');
  }

  get blogSubtitle() {
    return this.form.get('blogSubtitle');
  }

  get blogImage() {
    return this.form.get('blogImage');
  }

  get blogBody() {
    return this.form.get('blogBody');
  }
}
