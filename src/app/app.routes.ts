import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MealResultsComponent } from './components/meal-results/meal-results.component';
import { MealDetailComponent } from './components/meal-detail/meal-detail.component';
import { CategoriesComponent } from './components/categories/categories.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'results/:type',
    component: MealResultsComponent
  },

  {
    path: 'meal/:id',
    component: MealDetailComponent
  },

  {
    path: 'categories',
    component: CategoriesComponent
  },

  { path: '**', redirectTo: '' }
];