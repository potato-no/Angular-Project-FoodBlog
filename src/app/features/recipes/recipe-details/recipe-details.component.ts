import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/core/interfaces';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})

export class RecipeDetailsComponent {
  showEditMode: boolean = false;
  formSubmitted: boolean = false;
  isOwner: boolean = false;
  recipe: IRecipe | undefined;
  hasSaved: boolean = false;
  hasLiked: boolean = false;
  
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private recipeService: RecipeService) {
    this.getRecipe()
    this.hasInteracted()
  }
  
  getRecipe() {
    this.recipe = undefined;
    const recipeId = this.activatedRoute.snapshot.params['id'];
    this.recipeService.getRecipe(recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.createForm({ ...this.recipe });
        if (this.authService.user?._id == recipe.userId._id) {
          this.isOwner = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  hasInteracted() {
    const userId =  this.authService.user?._id;

    if (this.recipe?.saves.includes(userId!)) { 
      this.hasSaved = true; 
    }

    if (this.recipe?.likes.includes(userId!)) { 
      this.hasLiked = true; 
    }
  }
  
  form!: FormGroup;

  createForm(formValue: any) { 
    this.form = this.fb.group({
      recipeName: [formValue.recipeName, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      imgUrl: [formValue.imgUrl, [Validators.required]],
      ingredients: [formValue.ingredients, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      description: [formValue.description, [Validators.required, Validators.minLength(20), Validators.maxLength(400)]],
    })
  }

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
    if (this.showEditMode) {
      this.formSubmitted = false;
    }
  }

  updateRecipe(): void {
    const recipeId = this.activatedRoute.snapshot.params['id'];
    this.formSubmitted = true;
    if (this.form.invalid) { return; }
    const { recipeName, imgUrl, ingredients, description } = this.form.value;
    this.recipeService.updateRecipe(recipeId, recipeName, imgUrl, ingredients, description).subscribe(() => {
      this.getRecipe()      
      this.toggleEditMode();
    });
  }
  
  delete(): void {
    if (this.authService.user?._id != this.recipe?.userId._id) {
      this.router.navigate(['**']);
    }
    const recipeId = this.recipe?._id;
    this.recipeService.deleteRecipe(recipeId).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
      } 
    })
  }
  
  save(): void {
    const recipeId = this.activatedRoute.snapshot.params['id'];
    const userId =  this.authService.user?._id;
    
    if (this.recipe?.saves.includes(userId!)) { 
      this.hasSaved = true; 
      alert('Already saved!')
      return;
    }
    
    this.recipeService.saveRecipe(recipeId, userId!).subscribe({
      next: () => {
        this.hasSaved = true; 
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  like(): void {
    const recipeId = this.activatedRoute.snapshot.params['id'];
    const userId =  this.authService.user?._id;

    if (this.recipe?.likes.includes(userId!)) { 
      alert('Already liked!')
      this.hasLiked = true;
      return; 
    }
    this.recipeService.likeRecipe(recipeId, userId!).subscribe({
      next: () => {
        this.hasLiked = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
