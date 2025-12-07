import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MealDbService } from '../../services/meal-db.service';
import { Meal } from '../../interfaces/meal.interface';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-by-name.component.html'
})
export class SearchByNameComponent {
  onResults = output<Meal[]>();
  
  searchTerm = signal<string>('');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private mealDbService: MealDbService) {}

  search() {
    const term = this.searchTerm().trim();
    
    if (!term) {
      this.errorMessage.set('Por favor ingresa un nombre para buscar');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.mealDbService.searchByName(term).subscribe({
      next: (meals) => {
        this.isLoading.set(false);
        if (meals.length === 0) {
          this.errorMessage.set('No se encontraron platillos con ese nombre');
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

  updateSearchTerm(value: string) {
    this.searchTerm.set(value);
    if (this.errorMessage()) {
      this.errorMessage.set('');
    }
  }
}
