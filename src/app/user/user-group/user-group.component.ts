import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users/users.service';
import {User} from '../user';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.css']
})
export class UserGroupComponent implements OnInit {

  groups: User[][] = null;
  usersGroupSize: number;
  usersGroupSector: string;
  usersGroupPeriod: string;
  colsNumber: number;
  groupColSize: number;
  rowHeight: number;


  constructor(private usersService: UsersService) {
    this.usersService.sendExportGroupPdf.subscribe(() => {
      this.exportGroupToPdf();
    });
    this.usersService.sendGroup.subscribe(data => {
      if (data) {
        this.groups = data.groups;
        this.usersGroupSize = data.size;
        this.usersGroupSector = data.sector;
        this.usersGroupPeriod = (data.createdAt) ? data.createdAt : null;
        switch (data.size) {
          case 2:
            this.colsNumber = 4;
            this.groupColSize = 6;
            this.rowHeight = 1;
            break;
          case 3:
            this.colsNumber = 3;
            this.groupColSize = 4;
            this.rowHeight = 0.8;
            break;
          default:
            this.colsNumber = 2;
            this.groupColSize = 3;
            switch (data.size) {
              case 4:
                this.rowHeight = 0.5;
                break;
              default:
                this.rowHeight = Math.ceil(data.size / 4 - 1) * 0.2 + 0.6;
                break;
            }
            break;
        }
      } else {
        this.groups = null;
      }
    });
  }

  ngOnInit() {
    const dataGroups = this.usersService._currentUsersGroup;
    if (dataGroups) {
      this.groups = dataGroups.groups;
      this.usersGroupSize = dataGroups.size;
      this.usersGroupSector = dataGroups.sector;
      switch (dataGroups.size) {
        case 2:
          this.colsNumber = 4;
          this.groupColSize = 6;
          this.rowHeight = 0.5;
          break;
        case 3:
          this.colsNumber = 3;
          this.groupColSize = 4;
          this.rowHeight = 0.7;
          break;
        default:
          this.colsNumber = 2;
          this.groupColSize = 3;
          switch (dataGroups.size) {
            case 4:
              this.rowHeight = 0.5;
              break;
            case 5:
              this.rowHeight = 1;
          }
          break;
      }
    }
  }

  drop(event: CdkDragDrop<User[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  async exportGroupToPdf() {
    const data = await document.getElementById('groups');
    await html2canvas(data).then(canvas  => {
      const imgWidth = 200;
      const pageHeight = 300;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('groups.pdf');
    });
  }
}
