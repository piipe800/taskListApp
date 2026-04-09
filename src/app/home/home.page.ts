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
  filteredTasks: Task[] = [];
  filterCategoryControl = new FormControl<string | null>(null);

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private featureFlagService: FeatureFlagService) {}

  async ngOnInit() {
    await this.featureFlagService.loadFlags();
    this.categoriesEnabled = this.featureFlagService.isCategoryFeatureEnabled();

    this.tasks = this.taskService.getTasks();

    if (this.categoriesEnabled) {
      this.categories = this.categoryService.getCategories();
    }
    this.filterCategoryControl.valueChanges.subscribe(() => {
      this.updateFilteredTasks();
    });
    this.updateFilteredTasks();
  }

  addTask() {
    const value = this.newTaskTitle.value;

    if (!value?.trim()) return;
    
    const categoryId = this.selectedCategoryControl.value || undefined;
    this.taskService.addTask(value, categoryId);
    this.tasks = this.taskService.getTasks();
    this.newTaskTitle.reset();
    this.selectedCategoryControl.reset();
    this.updateFilteredTasks();
  }

  toggleTask(taskId: string) {
    this.taskService.toggleTask(taskId);
    this.tasks = this.taskService.getTasks();
    this.updateFilteredTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
    this.updateFilteredTasks();
  }

  addCategory() {
    const value = this.newCategoryControl.value;

    if (!value?.trim()) return;

    this.categoryService.addCategory(value);
    this.categories = this.categoryService.getCategories();
    this.newCategoryControl.reset();
  }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
    this.categories = this.categoryService.getCategories();

    if (this.filterCategoryControl.value === categoryId) {
      this.filterCategoryControl.reset();
    }

    this.updateFilteredTasks();
  }

  updateFilteredTasks() {
    const selected = this.filterCategoryControl.value;
    if (!selected) {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(t => t.categoryId === selected);
    }
  }
}
