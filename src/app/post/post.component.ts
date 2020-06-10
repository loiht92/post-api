import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postList: Post[] = [];
  successMessage: string;
  failMessage: string;
  postForm: FormGroup;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('',
        [Validators.required,
          Validators.minLength(10)]),
      description: new FormControl('',
        [Validators.required,
          Validators.minLength(10)]),
      content: new FormControl('',
        [Validators.required,
          Validators.minLength(10)])
    }
    );

    this.postService.getAllPosts()
      .subscribe( result => {
      this.postList = result;
    }, error => {
        this.postList = [];
      });
  }

  onSubmit(){
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.postService.createPost(value)
        .subscribe(result =>
      { console.log('Add post successfully !');
        this.postList.push(result);
        this.postForm.reset({
          title: '', description: '', content: ''
        });
      }, error => {
          console.log('Add post successfully !');
      });
    }
  }

  deletePost(i){
    const post = this.postList[i];
    this.postService.deletePost(post.id)
      .subscribe(() => {
        this.successMessage = 'Delete post successfully !';
      }, error => {
        this.failMessage = 'Delete post fail';
      });
  }
}
