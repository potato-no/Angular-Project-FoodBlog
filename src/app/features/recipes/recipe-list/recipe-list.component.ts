import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IRecipe } from 'src/app/core/interfaces';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipeList: IRecipe[] | null = null;
  errorFetchingData = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.loadRecipes().subscribe({
      next: (value) => {
        this.recipeList = value;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.error(err);
      }
    });
  }
}
