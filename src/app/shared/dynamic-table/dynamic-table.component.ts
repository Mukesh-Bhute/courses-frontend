import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Output() viewDetails = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  onViewDetails(row: any): void {
    this.viewDetails.emit(row);
  }

  onDelete(row: any): void {
    this.deleteItem.emit(row);
  }
}
