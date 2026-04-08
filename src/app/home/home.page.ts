import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Task } from '../models/task';
import { TaskService } from '../services/task/task.service';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CategoryService } from '../services/category/category.service';
import { Category } from '../models/category';
import { FeatureFlagService } from '../services/feature-flags/feature-flag.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, ReactiveFormsModule],
})
export class HomePage implements OnInit {
  
  tasks: Task[] = [];
  newTaskTitle = new FormControl('');
  categories: Category[] = [];
  selectedCategoryControl = new FormControl<string | null>(null);
  newCategoryControl = new FormControl('');
  categoriesEnabled = false;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private featureFlagService: FeatureFlagService) {}

  async ngOnInit() {
    await this.featureFlagService.loadFlags();
    this.categoriesEnabled = this.featureFlagService.isCategoryFeatureEnabled();

    this.loadTasks();

    if (this.categoriesEnabled) {
      this.loadCategories();
    }
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  }

  loadCategories() {
    this.categories = this.categoryService.getCategories();
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

  addCategory() {
    const value = this.newCategoryControl.value;

    if (!value?.trim()) return;

    this.categoryService.addCategory(value);
    this.newCategoryControl.reset();
    this.loadCategories();
  }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
    this.loadCategories();
  }
}
