import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appEmailDomain } from 'src/app/core/constants';
import { appEmailValidator, sameValueGroupValidator } from 'src/app/core/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, appEmailValidator(appEmailDomain)]],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePass: []
    }, {
      validators: [sameValueGroupValidator('password', 'rePass')]
    })
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  registerHandler() {
    if (this.form.invalid) { return; }
    const { username, email, pass: { password, rePass } = {} } = this.form.value;
    this.authService.register(username!, email!, password!, rePass!)
      .subscribe(user => {
        this.router.navigate(['/recipe/recent']); 
      });
  }
}