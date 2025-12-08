import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDbService } from '../../services/meal-db.service';
import { Category, Meal } from '../../interfaces/meal.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(false);
  isLoadingMeals = signal<boolean>(false);
  errorMessage = signal<string>('');
  selectedCategory = signal<string>('');

  constructor(private mealDbService: MealDbService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.mealDbService.getCategories().subscribe({
      next: (categories) => {
        this.isLoading.set(false);
        this.categories.set(categories);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al cargar categorías. Intenta de nuevo.');
        console.error('Error:', error);
      }
    });
  }

  selectCategory(categoryName: string) {
    this.selectedCategory.set(categoryName);
    this.isLoadingMeals.set(true);

    this.mealDbService.filtersByCategory(categoryName).subscribe({
      next: (meals) => {
        this.isLoadingMeals.set(false);
        this.router.navigate(['/results', 'category'], { state: { meals } });
      },
      error: (error) => {
        this.isLoadingMeals.set(false);
        this.errorMessage.set('Error al cargar platillos. Intenta de nuevo.');
        console.error('Error:', error);
      }
    });
  }

  handleBack() {
    this.router.navigate(['/'])
  }
}