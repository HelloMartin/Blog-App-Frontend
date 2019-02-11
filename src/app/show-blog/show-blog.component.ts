import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        const id = params.get('id');

        this.service.get(id)
          .subscribe(response => this.blog = response.blog);
      })
  }
}
