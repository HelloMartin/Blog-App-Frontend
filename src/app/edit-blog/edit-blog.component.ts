import { DataService } from './../services/data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BlockingProxy } from 'blocking-proxy';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blog = {
    _id: '',
    title: '',
    image: '',
    body: ''
  };

  constructor(
    private service: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');

        this.service.get(id)
          .subscribe(response => this.blog = response.blog);
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
      image: form.controls.blogImage.value,
      body: form.controls.blogBody.value,
    }
  }

}
