import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { Meal } from '../../interfaces/meal.interface';

@Component({
  selector: 'app-meal-results',
  standalone: true,
  imports: [CommonModule, MealCardComponent],
  templateUrl: './meal-results.component.html',
  styleUrls: ['./meal-results.component.css']
})
export class MealResultsComponent {
  meals = input.required<Meal[]>();
  searchType = input<string>('');
  onMealSelected = output<Meal>();
  onBack = output<void>();

  handleMealClick(meal: Meal) {
    this.onMealSelected.emit(meal);
  }

  handleBack() {
    this.onBack.emit();
  }

  getResultsTitle(): string {
    const count = this.meals().length;
    const type = this.searchType();
    
    if (type === 'random') {
      return 'Tu Platillo Aleatorio';
    } else if (type === 'name') {
      return `${count} Resultado${count !== 1 ? 's' : ''} Encontrado${count !== 1 ? 's' : ''}`;
    } else if (type === 'letter') {
      return `${count} Platillo${count !== 1 ? 's' : ''} Encontrado${count !== 1 ? 's' : ''}`;
    } else if (type === 'category') {
      return `${count} Platillo${count !== 1 ? 's' : ''} en esta Categoría`;
    }
    
    return `${count} Resultado${count !== 1 ? 's' : ''}`;
  }
}
