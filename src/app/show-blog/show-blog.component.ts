import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.css']
})
export class ShowBlogComponent implements OnInit {
  blog = {
    _id: '',
    title: '',
    image: '',
    body: ''
  };

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.blog._id = params.get('id');

        this.service.get(this.blog._id)
          .subscribe(response => this.blog = response.blog);
      })
  }

  deleteBlog() {
    this.service.delete(this.blog)
        .subscribe(response => this.router.navigate(['/']));
    }
}
