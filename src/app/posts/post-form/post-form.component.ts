import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from '../model/interfaces';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  form = this.fb.group({
    title: this.fb.control('', Validators.required),
    body: this.fb.control('', Validators.required)
  });

  constructor(private fb: FormBuilder, private postService: PostService) { }

  createPost(): void {
    const post = this.form.value as Post;
    this.postService.addPost(post);
    this.form.reset();
  }
}
