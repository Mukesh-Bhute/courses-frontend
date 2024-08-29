import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstanceService } from 'src/app/services/instance.service';
import { InstanceCreateComponent } from '../instance-create/instance-create.component';
import { InstanceDetailsComponent } from '../instance-details/instance-details.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.css']
})
export class InstanceListComponent implements OnInit {
  instances: any[] = [];
  years: number[] = [];
  semesters: number[] = [];
  searchForm: FormGroup;
  displayedColumns: string[] = ['Course_Title', 'Year_Sem',   'Code'];

  constructor(
    private instanceService: InstanceService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { 
    this.searchForm = this.fb.group({
      year: [''],
      semester: ['']
    });
  }

  ngOnInit(): void {
    this.getAllInstances();
  }

  getAllInstances(): void {
    this.instanceService.getAllInstances().subscribe(data => {
      this.instances = data.map((inst: any) => ({
        id: inst.id,
        Course_Title: inst.course.title,
        Code: inst.course.course_code,
        Year_Sem: inst.year+'-'+inst.semester,
        year:inst.year,
        semester:inst.semester,
        cid: inst.course.id
      }));
      console.log("datatatat :", this.instances)
      this.years = Array.from(new Set(data.map((instance: any) => instance.year)));
      this.semesters = Array.from(new Set(data.map((instance: any) => instance.semester)));
    });
  }

  search(): void {
    const year = this.searchForm.get('year')?.value;
    const semester = this.searchForm.get('semester')?.value;
    this.instanceService.getInstances(year, semester).subscribe(data => {
      this.instances = data.map((inst: any) => ({
        id: inst.id,
        course_title: inst.course.title,
        course_code: inst.course.course_code,
        course_description: inst.course.description,
        Year_Sem: inst.year+'-'+inst.semester,
      }));
      console.log("datatatat :", this.instances)
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(InstanceCreateComponent, {
      width: '60vw',
      height: '60vh',
      data: { },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllInstances();
      }
    });
  }

  openDetailsDialog(row: any): void {
    const dialogRef = this.dialog.open(InstanceDetailsComponent, {
      width: '60vw',
      height: '60vh',
      data: {
        year: row.year,
        semester: row.semester,
        courseId: row.cid
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllInstances();
      }
    });
  }

  deleteInstance(row: any): void {
    this.instanceService.deleteInstance(row.year, row.semester, row.cid).subscribe(() => {
      this.instances = this.instances.filter(instance =>
        instance.year !== row.year || instance.semester !== row.semester || instance.cid !== row.cid
      );
    });
  }
}
