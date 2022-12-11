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

//TODO fix this
  createRecipe(recipeName: string, imgUrl: string, ingredients: string, description: string) {
    return this.http.post<IRecipe>('/api/recipes/', { recipeName: recipeName, imgUrl: imgUrl, ingredients: ingredients, description: description });
  }

  updateRecipe(id: string, recipeName: string, imgUrl: string, ingredients: string, description: string) {
    return this.http.put<IRecipe>('/api/recipes/' + id, { recipeName: recipeName, imgUrl: imgUrl, ingredients: ingredients, description: description });
  }

  deleteRecipePost(recipeId: string, postId: string) {
    return this.http.delete<IRecipe>('/api/recipes/' + recipeId + '/post' + postId);
  }
}
