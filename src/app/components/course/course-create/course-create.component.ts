import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<CourseCreateComponent>
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      course_code: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {  
  }

  createCourse(): void {
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.courseForm.value).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        (error) => {
          alert('something went wrong!');
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
