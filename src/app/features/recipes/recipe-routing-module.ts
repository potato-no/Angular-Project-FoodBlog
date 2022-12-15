import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeNewComponent } from "./recipe-new/recipe-new.component";
import { RecipeResolver } from "./recipe.resolver";

const routes: Routes = [
  {
    path: 'recent',
    component: RecipeListComponent,
    data: {
      title: 'Recipes',
    } 
  },
  {
    path: 'new',
    component: RecipeNewComponent,
    data: {
      title: 'Create New Recipe',
    } 
  },
  {
    path: ':id',
    component: RecipeDetailsComponent,
  },
  {
    path: 'detail/:id',
    resolve: {
      recipe: RecipeResolver
    },
    component: RecipeDetailsComponent,
    data: {
      title: 'Details'
    } 
  },
];

export const RecipeRoutingModule = RouterModule.forChild(routes);