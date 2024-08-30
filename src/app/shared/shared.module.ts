import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule
  ],
  exports: [
    DynamicTableComponent
  ]
})
export class SharedModule { }
