import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(maxCount?: number) {
    let url = '/api/recipes';
    if (maxCount) {
      url += '?limit=5';
    }
    return this.http.get<IRecipe[]>(url);
  }
 
  getRecipe(id: string) {
    return this.http.get<IRecipe>('/api/recipes/' + id); 
  }

  createRecipe(recipeName: string, imgUrl: string, ingredients: string, description: string) {
    return this.http.post<IRecipe>('/api/recipes/', { recipeName: recipeName, imgUrl: imgUrl, ingredients: ingredients, description: description });
  }

  updateRecipe(id: string, recipeName: string, imgUrl: string, ingredients: string, description: string) {
    return this.http.put<IRecipe>('/api/recipes/' + id, { recipeName: recipeName, imgUrl: imgUrl, ingredients: ingredients, description: description });
  }

  deleteRecipe(recipeId: string | undefined) {
    return this.http.delete<IRecipe>('/api/recipes/' + recipeId);
  }

  saveRecipe(recipeId: string, userId: string) {
    return this.http.put<IRecipe>('/api/saves/' + recipeId, { userId: userId });
  }

  likeRecipe(recipeId: string, userId: string | undefined) {
    return this.http.put<IRecipe>('/api/likes/' + recipeId, { userId: userId });
  }
}
