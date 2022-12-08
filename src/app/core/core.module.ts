import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from './error/error.component';
import { AppEmailDirective } from './validators/app-email.directive';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    AppEmailDirective,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    AppEmailDirective,
    LoaderComponent,
  ]
})
export class CoreModule { }
