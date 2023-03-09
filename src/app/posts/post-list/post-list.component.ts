import { Component, Input } from '@angular/core';
import { Post } from '../model/interfaces';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts!: Post[];

  constructor(private postService: PostService) { }

  removePost(index: number): void {
    this.postService.removePost(index);
  }
}
