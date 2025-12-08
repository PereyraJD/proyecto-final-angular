import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meal } from '../../interfaces/meal.interface';
import { MealDbService } from '../../services/meal-db.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent {
  meal = signal<Meal | null>(null);
  fullMeal = signal<Meal | null>(null);
  isLoading = signal<boolean>(false);

  constructor(
    private mealDbService: MealDbService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    const nav = history.state;
    const navMeal = nav['meal'] ?? null;
    if (navMeal) {
      this.meal.set(navMeal);
      if (!navMeal.strInstructions || (navMeal.ingredients ?? []).length === 0) {
        this.loadFullMealDetails(navMeal.idMeal);
      } else {
        this.fullMeal.set(navMeal);
      }
    } else {
      const id = this.route.snapshot.params['id'];
      if (id) this.loadFullMealDetails(id);
    }
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
    this.router.navigate(['/']);
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