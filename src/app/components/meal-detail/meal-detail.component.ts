import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meal } from '../../interfaces/meal.interface';
import { MealDbService } from '../../services/meal-db.service';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent {
  meal = input<Meal | null>(null);
  onBack = output<void>();
  
  fullMeal = signal<Meal | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private mealDbService: MealDbService) {
    effect(() => {
      const currentMeal = this.meal();
      if (currentMeal) {
        // Si el meal tiene instrucciones, es completo
        if (currentMeal.strInstructions && currentMeal.ingredients.length > 0) {
          this.fullMeal.set(currentMeal);
        } else {
          // Si no tiene instrucciones, cargar detalles completos
          this.loadFullMealDetails(currentMeal.idMeal);
        }
      }
    });
  }

  loadFullMealDetails(mealId: string) {
    this.isLoading.set(true);
    this.mealDbService.getMealById(mealId).subscribe({
      next: (meal) => {
        this.isLoading.set(false);
        this.fullMeal.set(meal);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error loading meal details:', error);
      }
    });
  }

  handleBack() {
    this.onBack.emit();
  }

  getYoutubeEmbedUrl(url: string): string {
    if (!url) return '';
    const videoId = url.split('v=')[1];
    if (!videoId) return '';
    const ampersandPosition = videoId.indexOf('&');
    const cleanVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;
    return `https://www.youtube.com/embed/${cleanVideoId}`;
  }
}