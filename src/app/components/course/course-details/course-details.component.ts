import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: any;
  loader: boolean = true;

  constructor(
    private courseService: CourseService,
    public dialogRef: MatDialogRef<CourseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.courseService.getCourse(this.data).subscribe(data => {
      this.course = data;
      this.loader= false;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
