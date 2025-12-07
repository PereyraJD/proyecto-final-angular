import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Meal, Ingredient, Category, MealApiResponse, CategoryApiResponse } from '../interfaces/meal.interface';

@Injectable({
  providedIn: 'root',
})
export class MealDbService {
    private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

    constructor(private http: HttpClient) {}

      private mapMeals(response: MealApiResponse): Meal[] {
    if (!response.meals) return [];

    return response.meals.map(meal => ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strCategory: meal.strCategory || '',
      strArea: meal.strArea || '',
      strInstructions: meal.strInstructions || '',
      strMealThumb: meal.strMealThumb,
      strTags: meal.strTags,
      strYoutube: meal.strYoutube || '',
      ingredients: this.extractIngredients(meal)        
      }))
    }

    searchByName(name: string): Observable<Meal[]> {
      return this.http.get<MealApiResponse>(`${this.baseUrl}/search.php?s=${name}`).pipe(
        map(response => this.mapMeals(response))
      )
    }

    searchByFirstLetter(letter: string): Observable<Meal[]> {
      return this.http.get<MealApiResponse>(`${this.baseUrl}/search.php?f=${letter}`).pipe(
        map(response => this.mapMeals(response))
      )
    }

    getRandomMeal(): Observable<Meal | null> {
      return this.http.get<MealApiResponse>(`${this.baseUrl}/random.php`).pipe(
        map(response => {
          const meals = this.mapMeals(response);
          return meals.length > 0 ? meals[0] : null;
        }))}

    getCategories(): Observable<Category[]> {
      return this.http.get<CategoryApiResponse>(`${this.baseUrl}/categories.php`).pipe(
        map(response => response.categories  || [] )
      )
    }

    filtersByCategory(category: string): Observable<Meal[]> {
      return this.http.get<MealApiResponse>(`${this.baseUrl}/filter.php?c=${category}`).pipe(
        map(response => {
          if (!response.meals) return [];
          return response.meals.map(meal => ({
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: category,
            strArea: '',
            strInstructions: '',
            strTags: null,
            strYoutube: '',
            ingredients: []            
          }));
        }))}

    getMealById(id: string): Observable<Meal | null> {
      return this.http.get<MealApiResponse>(`${this.baseUrl}/lookup.php?i=${id}`).pipe(
        map(response => {
          const meals = this.mapMeals(response);
          return meals.length > 0 ? meals[0] : null;
        }))
    }

  private extractIngredients(meal: any): Ingredient[] {
    const ingredients: Ingredient[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredientName = meal[`strIngredient${i}`];
      const ingredientMeasure = meal[`strMeasure${i}`];
      
      if (ingredientName && ingredientName.trim() !== '') {
        ingredients.push({
          name: ingredientName.trim(),
          measure: ingredientMeasure ? ingredientMeasure.trim() : ''
        });
      }
    }
    
    return ingredients;
  }
}