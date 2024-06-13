import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleSigninComponent } from './google-signin/google-signin.component';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet, GoogleSigninComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cv-analyze-app';
}
