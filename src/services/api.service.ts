import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // url = "http://localhost:4400/"
  url = "https://news5-api.onrender.com/"


  postSignup(data: any) {
    return this.http.post(`${this.url}signup`, data)
  }
  postLogin(data: any) {
    console.log("api call in signup");
    return this.http.post(`${this.url}login`, data)
  }
  postCreation(data: any) {
    return this.http.post(`${this.url}creation`, data)
  }
  getHome() {
    return this.http.get(`${this.url}home`)
  }
  getBlogView(id: any) {
    console.log("view works");

    return this.http.get(`${this.url}view/${id}`)
  }
  postComment(bid: any, data: any) {
    return this.http.post(`${this.url}comment/${bid}`, data)
  }
  postReplay(cid: any, data: any) {
    return this.http.post(`${this.url}replay/${cid}`, data)
  }

  getdashboard(data: any) {
    let params = new HttpParams().set('email', data.email);
    return this.http.get(`${this.url}getdashboard`, { params: params })
  }

  deleteBlog(blogId: string) {
    return this.http.delete(`${this.url}deleteblog/${blogId}`);
  }

  searchBlogs(query: string) {
    return this.http.get<any>(`${this.url}blogs/search?q=${encodeURIComponent(query)}`);
  }

  getCategoryBlogs(category: string) {
    return this.http.get<any>(`${this.url}blogs/category/${encodeURIComponent(category)}`);
  }
}
