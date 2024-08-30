import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstanceService } from 'src/app/services/instance.service';

@Component({
  selector: 'app-instance-details',
  templateUrl: './instance-details.component.html',
  styleUrls: ['./instance-details.component.css']
})
export class InstanceDetailsComponent implements OnInit {
  instance: any;
  loader: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<InstanceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private instanceService: InstanceService
  ) { }

  ngOnInit(): void {
    const { year, semester, courseId } = this.data;
    this.instanceService.getInstance(year, semester, courseId).subscribe(data => {
      this.instance = data;
      this.loader= false;
    });
  }
  closeDialog(): void {
    this.dialogRef.close(false);
  }
}
