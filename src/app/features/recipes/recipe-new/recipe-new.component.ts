import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.scss']
})
export class RecipeNewComponent {

  constructor(private recipeService: RecipeService, private router: Router) { }

  newRecipeHandler(form: NgForm): void {
    if (form.invalid) { return; }
    const { recipeName, imgUrl, ingredients, description } = form.value;

    this.recipeService.createRecipe(recipeName, imgUrl, ingredients, description)
      .subscribe(() => {
        this.router.navigate(['/recipe/recent'])
      })
  }
}
