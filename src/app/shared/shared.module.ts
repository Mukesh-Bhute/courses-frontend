import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Error404Component } from './error404/error404.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    DynamicTableComponent,
    Error404Component,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule
  ],
  exports: [
    DynamicTableComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
