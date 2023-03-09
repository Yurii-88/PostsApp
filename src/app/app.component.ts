import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post } from './posts/model/interfaces';
import { PostService } from './posts/services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isFormVisible = false;
  showSpinner = false;
  posts!: Observable<Post[]>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.showSpinner = true;
    this.posts = this.postService.getPosts().pipe(tap(() => this.showSpinner = false));
    this.postService.initializePosts();
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}
