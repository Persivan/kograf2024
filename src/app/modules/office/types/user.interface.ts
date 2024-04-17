export interface UserInterface {
  fio: string;
  password: string;
  weights: { [key: string]: number };
  id: string;
  role: string;
  plannedDate: string; // Дата до которой распланированы задачи
}
