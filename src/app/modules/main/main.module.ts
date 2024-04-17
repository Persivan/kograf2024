import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import {RouterModule, Routes} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatFormField} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";

export const MODULE_ROUTE = 'main';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [
    LandingComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatPaginator,
    MatFormField,
    MatTableModule
  ]
})
export class MainModule { }
