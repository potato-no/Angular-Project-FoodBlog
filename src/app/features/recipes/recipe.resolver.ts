import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApiService } from "src/app/api.service";
import { IRecipe } from "../../core/interfaces";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<IRecipe | null> {
  constructor(private apiService: ApiService, private router: Router) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IRecipe | null | Observable<IRecipe> | Promise<IRecipe> {
    const recipeId = route.params['id'];
    if (!recipeId) {
      this.router.navigate(['/recipe/recent']);
      return null;
    }
    return this.apiService.loadRecipe(recipeId);
  }
}