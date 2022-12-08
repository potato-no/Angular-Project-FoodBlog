import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Login',
      loginRequired: false
    } 
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Register',
      loginRequired: false
    } 
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Logout',
      loginRequired: true
    } 
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard], 
    data: {
      title: 'Profile',
      loginRequired: true
    } 
  }
];

export const AuthRoutingModule = RouterModule.forChild(routes);