import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment'
import {ViewEncapsulation} from '@angular/core'
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailComponent implements OnInit {

  blogPost: any
  date!: string
  html!: SafeHtml

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')
    this.http.get(`https://api.buttercms.com/v2/posts/${slug}/?auth_token=${environment.readApiToken}`)
    .subscribe((res: any) => {
      this.blogPost = res.data
      this.date = new Date(this.blogPost.created).toISOString().split('T')[0]
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.blogPost.body);
    })
  }
}
