import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meal } from '../../interfaces/meal.interface';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.css']
})
export class MealCardComponent {
  meal = input.required<Meal>();
  onClick = output<Meal>();

  handleClick() {
    this.onClick.emit(this.meal());
  }
}