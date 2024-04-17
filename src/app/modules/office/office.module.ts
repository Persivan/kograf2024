import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardComponent } from './components/board/board.component';
import {RouterModule, Routes} from "@angular/router";
import { OfficeComponent } from './office.component';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

export const MODULE_ROUTE = 'office';

const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {path: 'profile', component: ProfileComponent},
      {path: 'board', component: BoardComponent},
    ]
  },

];

@NgModule({
  declarations: [
    ProfileComponent,
    BoardComponent,
    OfficeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButton,
    MatIcon,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class OfficeModule { }
