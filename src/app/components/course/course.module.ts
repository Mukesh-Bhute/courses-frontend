import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CourseListComponent,
    CourseCreateComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CourseModule { }
