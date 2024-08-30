import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl:string;
  

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiBaseUrl+'/courses' 
        
   }

  getCourses(): Observable<any> {
    console.log("api>>>",this.apiUrl)
    return this.http.get(this.apiUrl+'-list');
  }

  getCourse(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(this.apiUrl, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/delete`);
  }
}
