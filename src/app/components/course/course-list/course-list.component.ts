import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';
import { CourseCreateComponent } from '../course-create/course-create.component';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: any[] = [];
  displayedColumns: string[] = ['title', 'course_code'];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  deleteCourse(id: number){
    this.courseService.deleteCourse(id).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== id);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CourseCreateComponent, {
      width: '50vw',
      height: '50vh',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCourses();
      }
    });
  }

  openDetailsDialog(id: any): void {
    const dialogRef = this.dialog.open(CourseDetailsComponent, {
      width: '60vw',
      height: '50vh',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllCourses();
      }
    });
  }

  navigateToInstance(): void {
    this.router.navigate(['/instances']);
  }
  

}
