import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {catchError, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {TaskInterface} from "../types/task.interface";
import {UserInterface} from "../types/user.interface";
import {resolve} from "@angular/compiler-cli";

const ASSIGN = 'tasks'
const GET_USERS = 'emloyees'
const UPDATE_USER = 'emloyees'
const GET_USER_ID = 'emloyees'
const GET_TASKS = 'tasks'

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  constructor(
    private http: HttpClient,
  ) {
  }

  async assignTasksToUsers(): Promise<boolean> {
    const fullUrl = environment.apiUrl + ASSIGN;
    const users = await this.getUsers().toPromise();
    console.log(users);
    const tasks = await this.getTasks().toPromise();
    console.log(tasks);

    if (!tasks || !users) return Promise.resolve(false);
    tasks.forEach(task => {
      if (task.assigned) return;

      // Находим свободного
      let nextUser = users.filter((user: { plannedDate: string | number | Date; }) => !user.plannedDate || new Date(user.plannedDate) < new Date())
      console.log('След пользовтаель: ', nextUser)


      this.assignTask(task, nextUser[0].fio).toPromise()
    })
    return Promise.resolve(true)
  }

  getUsers(): Observable<UserInterface[]> {
    const fullUrl = environment.apiUrl + GET_USERS;
    return this.http.get<UserInterface[]>(fullUrl);
  }

  getTasks(): Observable<TaskInterface[]> {
    const fullUrl = environment.apiUrl + GET_TASKS;
    return this.http.get<TaskInterface[]>(fullUrl);
  }

  /**
   * Привязка пользователя к задаче
   * @param task
   * @param fio
   */
  assignTask(task: TaskInterface, fio: string): Observable<boolean> {
    const fullUrl = environment.apiUrl + ASSIGN;
    return this.http.patch<any>(`${fullUrl}/${task.id}`, {assigned: fio}).pipe(
      switchMap(() => this.updatePlannedDate(fio, task.level)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  updatePlannedDate(fio: string, taskLevel: number): Observable<boolean> {
    const fullUrlForGetUserId = environment.apiUrl + GET_USER_ID;
    const fullUrlForUpdateUser = environment.apiUrl + UPDATE_USER;

    return this.http.get<any>(`${fullUrlForGetUserId}?fio=${fio}`)
      .pipe(
        mergeMap(users => {
          if (users.length === 1) {
            const user = users[0];
            let addToPlanned = user.weights[taskLevel];
            const dateStart = user.plannedDate ? new Date(user.plannedDate) : new Date();
            const workingHoursPerDay = 8;
            const remainingDays = Math.ceil(addToPlanned / workingHoursPerDay);
            const plannedDate = new Date(dateStart.getTime() + (remainingDays * 24 * 60 * 60 * 1000));
            console.log('Пользователь закончит задачи: ', user.plannedDate);
            console.log('Следующая задача займет у него: ', addToPlanned, 'час');
            console.log('Он освободится: ', plannedDate);
            return this.http.patch<boolean>(`${fullUrlForUpdateUser}/${user.id}`, {plannedDate: plannedDate})
          } else {
            return of(false);
          }
        }),
        catchError(() => of(false))
      );
  }
}
