import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IRecipe } from "../../core/interfaces";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<IRecipe | null> {
  constructor(private recipeService: RecipeService, private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IRecipe | null | Observable<IRecipe> | Promise<IRecipe> {
    const recipeId = route.params['id'];
    if (!recipeId) {
      this.router.navigate(['/recipe/recent']);
      return null;
    }
    return this.recipeService.getRecipe(recipeId);
  }
}