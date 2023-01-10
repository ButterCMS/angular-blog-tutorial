import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPosts:any[] = []
  searchValue = ''
  filteredBlogs: any[] = []

  constructor(private http: HttpClient) { }

  handleSearch() {
    this.filteredBlogs = this.blogPosts.filter((blog) => (
      blog.title.trim().toLocaleLowerCase()
      .includes(this.searchValue.trim().toLocaleLowerCase())
    ))
  }

  ngOnInit(): void {
    this.http.get(`https://api.buttercms.com/v2/posts/?exclude_body=true&auth_token=${environment.readApiToken}`).subscribe((res: any) => {
      this.blogPosts = res.data
      this.filteredBlogs = this.blogPosts
    })
  }
}