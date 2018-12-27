import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/group/users.service';
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
  sizeUsersGroup: number;
  colsNumber: number;
  groupColSize: number;
  rowHeight: number;


  constructor(private userService: UsersService) {
    const dataGroups = this.userService._currentUsersGroup;
    if (dataGroups) {
      this.groups = dataGroups.groups;
      this.sizeUsersGroup = dataGroups.size;
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

  ngOnInit() {
    this.userService.sendExportGroupPdf.subscribe(() => {
      this.exportGroupToPdf();
    });
    this.userService.sendGroup.subscribe(data => {
      this.groups = data.groups;
      this.sizeUsersGroup = data.size;
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
    });
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

  // makeHtmlGroup(data) {
  //   this.groups = [];
  //   this.sizeUsersGroup = data.size; // size of users groups
  //   const groups = data.groups;
  //   let groupsPerRow; // number of users per row in html
  //   let i = 0; // iterator for intermediate groups
  //   let z = 0; // iterator for each group in groups sent by group maker
  //   switch (this.sizeUsersGroup) {
  //     case 2:
  //       groupsPerRow = 4;
  //       loop:
  //         while (true) {
  //           this.groups[i] = [];
  //           for (let j = 0; j < groupsPerRow; j++) {
  //             this.groups[i].push(groups[z]);
  //             if (z === groups.length - 1) {
  //               break loop;
  //             }
  //             z++;
  //           }
  //           i++;
  //         }
  //       break;
  //     case 3:
  //       groupsPerRow = 3;
  //       loop:
  //         while (true) {
  //           this.groups[i] = [];
  //           for (let j = 0; j < groupsPerRow; j++) {
  //             this.groups[i].push(groups[z]);
  //             if (z === groups.length - 1) {
  //               break loop;
  //             }
  //             z++;
  //           }
  //           i++;
  //         }
  //       break;
  //     case 4:
  //     case 5:
  //       groupsPerRow = 2;
  //       loop:
  //         while (true) {
  //           this.groups[i] = [];
  //           for (let j = 0; j < groupsPerRow; j++) {
  //             this.groups[i].push(groups[z]);
  //             if (z === groups.length - 1) {
  //               break loop;
  //             }
  //             z++;
  //           }
  //           i++;
  //         }
  //       break;
  //     default:
  //       groupsPerRow = 1;
  //       for (z; z < groups.length; z++) {
  //         this.groups[z] = [];
  //         this.groups[z].push(groups[z]);
  //       }
  //   }
  //   this.colSizeRow = 12 / groupsPerRow;
  //   this.colSizeGroup = Math.trunc(12 / this.sizeUsersGroup);
  // }

  exportGroupToPdf() {
    const data = document.getElementById('groups');
    html2canvas(data).then(canvas => {
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
