import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDbService } from '../../services/meal-db.service';
import { Meal } from '../../interfaces/meal.interface';

@Component({
  selector: 'app-search-by-letter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-by-letter.component.html'
})
export class SearchByLetterComponent {
  onResults = output<Meal[]>();
  
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter = signal<string>('');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private mealDbService: MealDbService) {}

  searchByLetter(letter: string) {
    this.selectedLetter.set(letter);
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.mealDbService.searchByFirstLetter(letter).subscribe({
      next: (meals) => {
        this.isLoading.set(false);
        if (meals.length === 0) {
          this.errorMessage.set(`No se encontraron platillos que inicien con "${letter}"`);
        } else {
          this.onResults.emit(meals);
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al buscar platillos. Intenta de nuevo.');
        console.error('Error:', error);
      }
    });
  }
}