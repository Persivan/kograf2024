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
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/board/table/table.component';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTabsModule} from "@angular/material/tabs";
import { DirectorComponent } from './components/director/director.component';

export const MODULE_ROUTE = 'office';

const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {path: 'profile', component: ProfileComponent},
      {path: 'board', component: BoardComponent},
      {path: 'director', component: DirectorComponent},
    ]
  },

];

@NgModule({
  declarations: [
    ProfileComponent,
    BoardComponent,
    OfficeComponent,
    SidebarComponent,
    TableComponent,
    DirectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButton,
    MatIcon,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormField,
    MatInput,
    MatSort,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    MatTabsModule

  ]
})
export class OfficeModule { }
