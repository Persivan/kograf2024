import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {UserPairInterface} from "../../auth/types/userPair.interface";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TasksResponseInterface} from "../types/tasksResponse.interface";
import {TaskInterface} from "../types/task.interface";

const FETCH_ELEMENTS = 'tasks'
const FETCH_PAGINATION_DATA = 'tasks'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  getTableData(): Observable<TasksResponseInterface> {
    const fullUrl = environment.apiUrl + FETCH_ELEMENTS;
    return this.http.get<TaskInterface[]>(fullUrl)
      .pipe(
        map(tasks => this.filterTasks(tasks))
      );
  }

  getDataLength(): Observable<number> {
    const fullUrl = environment.apiUrl + FETCH_PAGINATION_DATA;
    return this.http.get<any[]>(fullUrl) // Replace with your JSON Server endpoint
      .pipe(
        map(data => data.length)
      );
  }

  filterTasks(tasks: TaskInterface[]): TasksResponseInterface {
    const currentDate = new Date();
    const outDatedTasks = tasks.filter(task => new Date(task.date) < currentDate);
    const thisDayTasks = tasks.filter(task => new Date(task.date).toDateString() === currentDate.toDateString());
    const thisWeekTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      const weekStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
      const weekEndDate = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate() + 6);
      return taskDate >= weekStartDate && taskDate <= weekEndDate;
    });
    const nextWeekTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      const nextWeekStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (7 - currentDate.getDay()));
      const nextWeekEndDate = new Date(nextWeekStartDate.getFullYear(), nextWeekStartDate.getMonth(), nextWeekStartDate.getDate() + 6);
      return taskDate >= nextWeekStartDate && taskDate <= nextWeekEndDate;
    });
    return { outDatedTasks, thisDayTasks, thisWeekTasks, nextWeekTasks };
  }


}
