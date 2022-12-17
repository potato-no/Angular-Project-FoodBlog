import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { appEmailDomain } from 'src/app/core/constants';
import { appEmailValidator } from 'src/app/core/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  showEditMode: boolean = false;
  formSubmitted: boolean = false;

  get user() {
    const { username, email } = this.authService.user!;
    return { username, email };
  }

  form!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm({ ...this.user });
  }

  createForm(formValue: any) {
    this.form = this.fb.group({
      username: [formValue.username, [Validators.required, Validators.minLength(5)]],
      email: [formValue.email, [Validators.required, appEmailValidator(appEmailDomain)]],
    })
  }

  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
    if (this.showEditMode) {
      this.formSubmitted = false;
    }
  }

  saveProfile(): void {
    this.formSubmitted = true;
    if (this.form.invalid) { return; }
    const { username, email } = this.form.value;
    this.authService.setProfile(username, email).subscribe(() => {
      this.toggleEditMode();
    });
  }
}