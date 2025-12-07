import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDbService } from '../../services/meal-db.service';
import { Meal } from '../../interfaces/meal.interface';

@Component({
  selector: 'app-random-meal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random-meal.component.html'
})
export class RandomMealComponent {
  onResults = output<Meal[]>();
  
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private mealDbService: MealDbService) {}

  getRandomMeal() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.mealDbService.getRandomMeal().subscribe({
      next: (meal) => {
        this.isLoading.set(false);
        if (meal) {
          this.onResults.emit([meal]);
        } else {
          this.errorMessage.set('No se pudo obtener un platillo aleatorio');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al obtener platillo aleatorio. Intenta de nuevo.');
        console.error('Error:', error);
      }
    });
  }
}