import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../authService/auth.service';

@Component({
  selector: 'app-blogview',
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './blogview.component.html',
  styleUrl: './blogview.component.css'
})
export class BlogviewComponent implements OnInit {
  constructor(private apiservices: ApiService, private router: Router, private aroute: ActivatedRoute, private authService: AuthService) { }
  blogview: any;
  id: any;
  comment = "";
  comment_length = 0
  error_msg: any;
  newComment: string = '';
  relatedPosts: any
  loader_active: boolean = false

  ngOnInit(): void {
    this.aroute.params.subscribe(params => {
      this.id = params['id'];
      this.fetchBlog(this.id);
    });
  }

  fetchBlog(id: string): void {
    this.loader_active = true
    this.apiservices.getBlogView(id).subscribe((res: any) => {
      this.blogview = res.blogs;
      this.comment_length = this.blogview.blog_comments.length;
      this.relatedPosts = res.relatedPosts;
      this.error_msg = res.msg;
      window.scrollTo(0, 0);
      this.loader_active = false
    });
  }

  copyLink(id: string): void {
    const url = `http://localhost:4200/view/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  }

  toggleReplyForm(index: number, event: Event): void {
    event.preventDefault();

  
    document.querySelectorAll('.reply-form').forEach(form => {
      form.setAttribute('style', 'display: none');
    });

    
    const replyForm = document.getElementById(`reply-form-${index}`);
    if (replyForm) {
      const currentDisplay = window.getComputedStyle(replyForm).display;
      replyForm.style.display = currentDisplay === 'block' ? 'none' : 'block';
    }
  }

  cancelReply(index: number): void {
    const replyForm = document.getElementById(`reply-form-${index}`);
    if (replyForm) {
      const textArea = replyForm.querySelector('textarea');
      if (textArea) {
        textArea.value = '';
      }
      replyForm.style.display = 'none';
    }
  }

  submitComment(): void {
    const user = this.authService.currentUserValue;
    if (!user) {
      console.warn("User not logged in");
      return;
    }

    if (this.comment.trim()) {
      const commentData = {
        comment: this.comment,
        user: user
      };

      this.apiservices.postComment(this.blogview._id, commentData).subscribe((data: any) => {
        // console.log("Comment added:", data);
        this.comment = "";
        window.location.reload();
      });
    }
  }

  submitReply(commentIndex: number): void {
    const user = this.authService.currentUserValue;
    if (!user) {
      console.warn("User not logged in");
      return;
    }

    const replyForm = document.getElementById(`reply-form-${commentIndex}`);
    if (replyForm) {
      const textArea = replyForm.querySelector('textarea') as HTMLTextAreaElement;
      if (textArea && textArea.value.trim()) {
        const commentId = this.blogview.blog_comments[commentIndex]._id;


        const replyData = {
          replays: textArea.value,
          user: user
        };

        this.apiservices.postReplay(commentId, replyData).subscribe((data: any) => {
          // console.log("Reply added:", data);
          textArea.value = '';
          window.location.reload();
        });
      }
    }
  }

  blogView(id: any) {
    // console.log("viewwwwwwwwwwid", id);
    this.router.navigate(['/view', id]);
  }
}
