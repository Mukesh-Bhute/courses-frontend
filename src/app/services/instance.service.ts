import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  private apiUrl = `${environment.apiBaseUrl}/instances`;

  constructor(private http: HttpClient) { }

  getAllInstances(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getInstances(year: number, semester: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${year}/${semester}`);
  }

  getInstance(year: number, semester: number, courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${year}/${semester}/${courseId}`);
  }

  createInstance(instance: any): Observable<any> {
    return this.http.post(this.apiUrl, instance);
  }

  deleteInstance(year: number, semester: number, courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${year}/${semester}/${courseId}/delete`);
  }
}
