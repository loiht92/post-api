import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL = 'http://localhost:8080/posts';

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL);
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.API_URL}/${id}`);
  }

  createPost(post: Partial<Post>): Observable<Post>{
    return this.httpClient.post<Post>(this.API_URL, post);
  }

  updatePost(post: Post): Observable<Post>{
    return this.httpClient.put<Post>(`${this.API_URL} /${post.id}`, post);
  }

  deletePost(id: number): Observable<Post>{
    return this.httpClient.delete<Post>(`${this.API_URL}/${id}`);
  }

}












