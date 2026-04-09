import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  STORAGE_KEY = 'categories';

  saveCategories(categories: Category[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
  }

  addCategory(name: string) {
    const categories = this.getCategories();

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
    };
    categories.push(newCategory);
    this.saveCategories(categories);
  }

  deleteCategory(categoryId: string) {
    const categories = this.getCategories().filter(c => c.id !== categoryId);
    this.saveCategories(categories);
  }
  
  getCategories(): Category[] {
    const categories = localStorage.getItem(this.STORAGE_KEY);
    return categories ? JSON.parse(categories) : [];
  }
}
