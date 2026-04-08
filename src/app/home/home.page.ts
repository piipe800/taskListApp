import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, ReactiveFormsModule],
})
export class HomePage implements OnInit {
  
  tasks: Task[] = [];
  newTaskTitle = new FormControl('');

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    const value = this.newTaskTitle.value;

    if (!value?.trim()) return;
    
    this.taskService.addTask(value);
    this.newTaskTitle.reset();
    this.loadTasks();
  }

  toggleTask(taskId: string) {
    this.taskService.toggleTask(taskId);
    this.loadTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.loadTasks();
  }
}
