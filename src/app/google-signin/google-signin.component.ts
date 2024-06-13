
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent implements OnInit {
  user: any;
  analyzeForm: FormGroup;
  tokens: number = 0;
  isLoading = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.analyzeForm = this.fb.group({
      description: ['', Validators.required],
      files: [null, Validators.required]
    });
    // Subscribe to user$ observable to get user data
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        console.log('User is logged in:', user.displayName);
        this.fetchUserTokens(user);
        // Additional logic when user is logged in
      } else {
        console.log('User is logged out.');
        // Additional logic when user is logged out
      }
    });
  }
  async fetchUserTokens(user:any) {

      const userRef = this.authService.firestore.collection('users').doc(user.uid);
      const userSnapshot: any = await userRef.get().toPromise();

      if (userSnapshot?.exists) {
        this.tokens = userSnapshot.data().tokens;
      }
  }
  async signInWithGoogle() {
    this.authService.signInWithGoogle().catch(error => {
      console.error('Error during Google sign-in:', error);
    });
  }

  private async loadUserTokens(uid: string) {
    this.tokens = await this.tokenService.getUserTokens(uid);
  }

  signOut() {
    this.tokens = 0;
    this.authService.signOut();
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length) {
      this.analyzeForm.patchValue({
        files: files
      });
    }
  }

  async onSubmit() {
    console.log(this.analyzeForm)
    if (this.analyzeForm.valid) {
      this.isLoading = true; // Show loader
      const { description, files } = this.analyzeForm.value;
      // console.log(this.user)
      // {
      //   "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocIxoUY_MU54KkMrrLEGZxegeeY5rVAIzijXUa8TvW4ubWHajs8=s96-c",
      //   "uid": "LjwDgs9WvAYWNSV3u3CQBgIWria2",
      //   "email": "amangupta1542@gmail.com",
      //   "displayName": "Aman Gupta",
      //   "tokens": 10,
      //   "lastLogin": {
      //       "seconds": 1718273735,
      //       "nanoseconds": 994000000
      //   }
      // }

      if (this.user) {
        const userRef = this.authService.firestore.collection('users').doc(this.user.uid);
        const userSnapshot = await userRef.get().toPromise();

        let tokens = 0;
        if (userSnapshot?.exists) {
          const userData: any = userSnapshot.data();
          tokens = userData.tokens || 0;

          if (tokens < files.length) {
            alert('Not enough tokens.');
            this.isLoading = false;
            return;
          }

          tokens -= files.length;
          await userRef.update({ tokens });
        }

        // Create or update the candidate collection
        const candidateRef = this.authService.firestore.collection('candidates').doc(this.user.uid);
        const candidateSnapshot = await candidateRef.get().toPromise();

        if (!candidateSnapshot?.exists) {
          await candidateRef.set({
            uid: this.user.uid,
            description,
            files: Array.from(files).map((file: any) => file.name),
            createdAt: new Date()
          });
        } else {
          const existingData: any = candidateSnapshot.data();
          await candidateRef.set({
            ...existingData,
            description,
            files: [...existingData.files, ...Array.from(files).map((file: any) => file.name)],
            updatedAt: new Date()
          }, { merge: true });
        }
        this.analyzeForm.reset(); // Reset the form
        // this.router.navigate(['/candidate']);
      }
      else{
        alert('Please login!');
      }
      this.isLoading = false;
    }
  }

}
