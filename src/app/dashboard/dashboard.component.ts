import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tokens: number = 9;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchUserTokens();
  }

  async fetchUserTokens() {
    const user = null;

    // if (user) {
    //   const userRef = this.authService.firestore.collection('users').doc(user.uid);
    //   const userSnapshot: any = await userRef.get().toPromise();

    //   if (userSnapshot?.exists) {
    //     this.tokens = userSnapshot.data().tokens;
    //   }
    // }
  }
}
