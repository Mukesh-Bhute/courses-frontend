import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstanceService } from 'src/app/services/instance.service';
import { InstanceCreateComponent } from '../instance-create/instance-create.component';
import { InstanceDetailsComponent } from '../instance-details/instance-details.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  loader: boolean = true;

  constructor(
    private router: Router,
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
    this.loader=true;
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
      this.years = Array.from(new Set(data.map((instance: any) => instance.year)));
      this.semesters = Array.from(new Set(data.map((instance: any) => instance.semester)));
      this.loader=false;
    });
  }

  search(): void {
    this.loader=true;
    const year = this.searchForm.get('year')?.value;
    const semester = this.searchForm.get('semester')?.value;
    this.instanceService.getInstances(year, semester).subscribe(data => {
      this.instances = data.map((inst: any) => ({
        id: inst.id,
        Course_Title: inst.course.title,
        Code: inst.course.course_code,
        Year_Sem: inst.year+'-'+inst.semester,
        year:inst.year,
        semester:inst.semester,
        cid: inst.course.id
      }));
      this.loader=false;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(InstanceCreateComponent, {
      width: '50vw',
      height: '45vh',
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
      width: '40vw',
  
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

  navigateToCourses(): void {
    this.router.navigate(['/courses']);
  }
}
