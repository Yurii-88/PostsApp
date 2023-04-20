import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, map, Observable, tap, throwError } from 'rxjs';
import { Post } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com';
  posts = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.posts.asObservable();
  }

  addPost(post: Post): void {
    const { body, title } = post;
    const newPost: Post = {
      body,
      title,
    };

    this.posts.getValue().push(newPost);
  }

  removePost(index: number): void {
    const posts = this.posts.getValue();

    posts.splice(index, 1);
    this.posts.next(posts);
  }

  initializePosts(): void {
    this.http.get<Post[]>(`${this.url}/posts`)
    .pipe(
      map(posts => posts.slice(0, 5)),
      map(posts => posts.map(item => ({ title: item.title, body: item.body }))),
      tap(posts => this.posts.next(posts)),
      delay(2000),
      catchError((err) => throwError(() => new Error(err)))
    )
    .subscribe({
      error: err => console.error('HTTP Error', err)
    });
  }
}