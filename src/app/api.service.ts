import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRecipe } from './core/interfaces/recipe';
import { IPost } from './core/interfaces/post';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  loadRecipes() {
    return this.httpClient.get<IRecipe[]>(`${apiURL}/recipes`);
  }

  loadRecipe(id: number) {
    return this.httpClient.get<IRecipe>(`${apiURL}/recipes/${id}`);
  }

  loadPosts(limit?: number) {
    return this.httpClient.get<IPost[]>(`${apiURL}/posts${limit ? '?limit=${limit}' : ''}}`);
  }
}
