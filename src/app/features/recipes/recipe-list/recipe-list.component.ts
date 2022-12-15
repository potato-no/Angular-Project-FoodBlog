import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipeList: IRecipe[] | null = null;
  errorFetchingData = false;
  

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe({
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
