import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstanceService } from 'src/app/services/instance.service';
import { InstanceCreateComponent } from '../instance-create/instance-create.component';
import { InstanceDetailsComponent } from '../instance-details/instance-details.component';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.css']
})
export class InstanceListComponent implements OnInit {
  instances: any[] = [];

  constructor(
    private instanceService: InstanceService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllInstances();
  }

  getAllInstances(): void {
    this.instanceService.getAllInstances().subscribe(data => {
      this.instances = data;
    });
  }

  getInstances(year: number, semester: number): void {
    this.instanceService.getInstances(year, semester).subscribe(data => {
      this.instances = data;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(InstanceCreateComponent, {
      width: '60vw',
      height: '60vh',
      data: {
        
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllInstances();
      }
    });
  }

  openDetailsDialog(year: number, semester: number, courseId: number): void {
    const dialogRef = this.dialog.open(InstanceDetailsComponent, {
      width: '60vw',
      height: '60vh',
      data: { year, semester, courseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  deleteInstance(year: number, semester: number, courseId: number): void {
    this.instanceService.deleteInstance(year, semester, courseId).subscribe(() => {
      this.instances = this.instances.filter(instance =>
        instance.year !== year || instance.semester !== semester || instance.course.id !== courseId
      );
    });
  }
}
