import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InstanceService } from 'src/app/services/instance.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-instance-create',
  templateUrl: './instance-create.component.html',
  styleUrls: ['./instance-create.component.css']
})
export class InstanceCreateComponent implements OnInit {
  instanceForm: FormGroup;
  courses: any[] = [];
  instanceExists: boolean = true;

  constructor(
    private fb: FormBuilder,
    private instanceService: InstanceService,
    private courseService: CourseService,
    private dialogRef: MatDialogRef<InstanceCreateComponent>
  ) {
    this.instanceForm = this.fb.group({
      year: [''],
      semester: [''],
      course: ['']
    });

    this.courseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  ngOnInit(): void {  
  }

  checkInstanceExists() {
    const year = this.instanceForm.value.year;
    const semester = this.instanceForm.value.semester;
    const courseId = this.instanceForm.value.course;
    this.instanceService.getInstance(year, semester, courseId).subscribe(data => {
      let instance = data;
      console.log("check called :", instance)
      this.instanceExists = data.exists;
    });
  }

  createInstance(): void {
    this.instanceExists = true;
    const year = this.instanceForm.value.year;
    const semester = this.instanceForm.value.semester;
    const courseId = this.instanceForm.value.course;
    this.instanceService.getInstance(year, semester, courseId).subscribe(data => {
      if ( data === null || data === '' ) {
        this.instanceExists = false;
      }
      if (this.instanceExists) {     
        alert('Instance already exists!');
      } else {
        if (this.instanceForm.valid) {
          this.instanceService.createInstance(this.instanceForm.value).subscribe(() => {
            alert('Instance created suceessfully!');
            this.dialogRef.close(true);
          });
        }
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
