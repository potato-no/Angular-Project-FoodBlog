import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeNewComponent } from './recipe-new/recipe-new.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeRoutingModule } from './recipe-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeNewComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
