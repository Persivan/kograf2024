import {TaskInterface} from "./task.interface";

export interface TasksResponseInterface {
  outDatedTasks: TaskInterface[],
  thisDayTasks: TaskInterface[],
  thisWeekTasks: TaskInterface[],
  nextWeekTasks: TaskInterface[],
}
