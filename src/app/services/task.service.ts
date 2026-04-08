import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  STORAGE_KEY = 'tasks';

  constructor() { }

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  addTask(title: string): void {
    const tasks = this.getTasks();

    const newTask: Task = {
      id: new Date().toString(),
      title,
      completed: false
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
  }

  toggleTask(taskId: string): void {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks(tasks);
    }
  }

  deleteTask(taskId: string): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    this.saveTasks(tasks);
  }
  
}
