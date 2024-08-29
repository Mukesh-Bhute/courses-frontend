import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstanceRoutingModule } from './instance-routing.module';
import { InstanceListComponent } from './instance-list/instance-list.component';
import { InstanceDetailsComponent } from './instance-details/instance-details.component';
import { InstanceCreateComponent } from './instance-create/instance-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InstanceListComponent,
    InstanceDetailsComponent,
    InstanceCreateComponent
  ],
  imports: [
    CommonModule,
    InstanceRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule
  ]
})
export class InstanceModule { }
