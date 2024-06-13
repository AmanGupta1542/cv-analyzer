import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet, GoogleSigninComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    // private router: Router
  ) {}

  async ngOnInit() {
    // Automatically redirect if user is already authenticated
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log('User logged in:', user.displayName);
        // this.router.navigate(['/dashboard']); // Navigate to dashboard or any other route after login
      } else {
        console.log('User logged out.');
        // this.router.navigate(['/login']); // Navigate to login page if not authenticated
      }
    });
  }

  async signOut() {
    await this.authService.signOut();
    // this.router.navigate(['/login']);
  }
}
