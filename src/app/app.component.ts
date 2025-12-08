import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MealResultsComponent } from './components/meal-results/meal-results.component';
import { MealDetailComponent } from './components/meal-detail/meal-detail.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { Meal } from './interfaces/meal.interface';
import {  RouterOutlet } from '@angular/router';

export type PageType = 'home' | 'results' | 'detail' | 'categories';

export interface SearchEvent {
  meals: Meal[];
  type: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    MealResultsComponent,
    MealDetailComponent,
    CategoriesComponent,
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentPage = signal<PageType>('home');
  selectedMeal = signal<Meal | null>(null);
  searchResults = signal<Meal[]>([]);
  searchType = signal<string>('');

  navigateToHome() {
    this.currentPage.set('home');
    this.selectedMeal.set(null);
    this.searchResults.set([]);
  }

  navigateToResults(event: SearchEvent) {
    this.searchResults.set(event.meals);
    this.searchType.set(event.type);
    this.currentPage.set('results');
  }

  navigateToCategoryResults(meals: Meal[]) {
    this.searchResults.set(meals);
    this.searchType.set('category');
    this.currentPage.set('results');
  }

  navigateToDetail(meal: Meal) {
    this.selectedMeal.set(meal);
    this.currentPage.set('detail');
  }

  navigateToCategories() {
    this.currentPage.set('categories');
  }

  goBack() {
    if (this.currentPage() === 'detail') {
      this.currentPage.set('results');
    } else if (this.currentPage() === 'results' || this.currentPage() === 'categories') {
      this.currentPage.set('home');
    }
  }
}