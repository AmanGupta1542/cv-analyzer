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
    this.authService.afAuth.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.authService.user = user;
        // this.router.navigate(['/dashboard']); // Example route after login
      } else {
        this.authService.user = null;
        // this.router.navigate(['/login']); // Example route for login page
      }
    });
  }

  async signOut() {
    await this.authService.signOut();
    // this.router.navigate(['/login']);
  }
}
