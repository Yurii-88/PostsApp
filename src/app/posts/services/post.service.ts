import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, switchMap, tap } from 'rxjs';
import { Post } from '../model/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com';
  private posts = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) { }

  private initializePosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`)
    .pipe(
      map(posts => posts.slice(0, 5)),
      map(posts => posts.map(item => ({ title: item.title, body: item.body }))),
      tap(posts => this.posts.next(posts)),
      delay(2000),
    );
  }

  getPosts(): Observable<Post[]> {
    return this.initializePosts().pipe(switchMap(() => this.posts.asObservable()));
  }

  addPost(post: Partial<Post>): void {
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
}