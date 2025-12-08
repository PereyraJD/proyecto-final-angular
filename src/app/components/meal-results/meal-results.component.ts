import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { Meal } from '../../interfaces/meal.interface';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-meal-results',
  standalone: true,
  imports: [CommonModule, MealCardComponent],
  templateUrl: './meal-results.component.html',
  styleUrls: ['./meal-results.component.css']
})

export class MealResultsComponent {
  

  meals = signal<Meal[]>([]);
  searchType = signal<string>('');

  constructor(private router: Router, private route: ActivatedRoute) {

    const nav = history.state

    this.meals.set(nav['meals'] ?? []);
    this.searchType.set(this.route.snapshot.paramMap.get('type') ?? '');
    
  }

  handleMealClick(meal: Meal) {
    this.router.navigate(['/meal', meal.idMeal],
       { state: { meal }
    });
  }

  handleBack() {
    this.router.navigate(['/']);
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
