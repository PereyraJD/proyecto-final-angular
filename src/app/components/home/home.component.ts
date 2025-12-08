import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchByNameComponent } from '../search-by-name/search-by-name.component';
import { SearchByLetterComponent } from '../search-by-letter/search-by-letter.component';
import { RandomMealComponent } from '../random-meal/random-meal.component';
import { Meal } from '../../interfaces/meal.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    SearchByNameComponent, 
    SearchByLetterComponent, 
    RandomMealComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  activeSearch: 'name' | 'letter' | 'random' | null = null;

  showSearch(type: 'name' | 'letter' | 'random') {
    this.activeSearch = type;
    }
  
  handleSearchResults(meals: Meal[], type: string) {
    this.router.navigate(['/results', type], { 
      state: { meals } });
  }

  closeSearch() {
    this.activeSearch = null;
  }

}
