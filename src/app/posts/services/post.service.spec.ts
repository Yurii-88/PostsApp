import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Post } from '../model/interfaces';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let posts: Post[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(PostService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new post', () => {
    const POSTS_MOCK: Post[] = [
      {
        body: 'body 1',
        title: 'title 1'
      }
   ];

    service.posts.next(POSTS_MOCK);
    posts = service.posts.getValue();

    const newPost = {
      body: 'body 2',
      title: 'title 2'
    };

    service.addPost(newPost);

    expect(posts.length).toBe(2);
  });

  it('should remove a post', () => {
    const POSTS_MOCK: Post[] = [
      {
        body: 'body 1',
        title: 'title 1'
      },
      {
        body: 'body 2',
        title: 'title 2'
      },
    ];
    service.posts.next(POSTS_MOCK);
    posts = service.posts.getValue();

    service.removePost(1);

    expect(posts.length).toBe(1);
    expect(posts.find(post => post.body === 'body 2')).toBeUndefined();
  });
});