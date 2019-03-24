import { AuthService } from './../services/auth.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  blogs: any;

  constructor(
    private service: DataService,
    private authService: AuthService) { }

  ngOnInit() {
    this.service.getAll()
      .subscribe(response => this.blogs = response.blogs);
  }
}
