import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent {
  course = {
    title: '',
    course_code: '',
    description: ''
  };

  constructor(
    private courseService: CourseService,
    public dialogRef: MatDialogRef<CourseCreateComponent>
  ) {}

  createCourse(): void {
    this.courseService.createCourse(this.course).subscribe(() => {
      this.dialogRef.close(true);
    },
    (error) => {
      alert('something went wrong!');
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
