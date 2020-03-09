import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSubscription: Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {

    this.errorSubscription = this.postService.error.subscribe(errorMessage =>{
      this.error = errorMessage;
    } )

    this.isFetching = true;
    this.postService.fectPost().subscribe(post=>{
      this.isFetching = false;
      this.loadedPosts = post;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fectPost().subscribe(post=>{
      this.isFetching = false;
      this.loadedPosts = post;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(
      ()=>{
        this.loadedPosts =[];
      }
    )
  }

ngOnDestroy(){
  this.errorSubscription.unsubscribe();
}

}
