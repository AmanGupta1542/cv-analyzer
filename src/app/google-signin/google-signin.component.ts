// import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';

// @Component({
//   selector: 'app-google-signin',
//   standalone: true,
//   imports: [],
//   templateUrl: './google-signin.component.html',
//   styleUrl: './google-signin.component.css'
// })

// export class GoogleSigninComponent {
//   constructor(public afAuth: AngularFireAuth) {}

//   signInWithGoogle() {
//     this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
//   }

//   signOut() {
//     this.afAuth.signOut();
//   }
// }


// import { Component } from '@angular/core';
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

// @Component({
//   selector: 'app-google-signin',
//   templateUrl: './google-signin.component.html',
//   styleUrls: ['./google-signin.component.css']
// })
// export class GoogleSigninComponent {

//   constructor(public afAuth: AngularFireAuth) {}

//   signInWithGoogle() {
//     this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
//     // const auth = getAuth();
//     // signInWithPopup(auth, new GoogleAuthProvider())
//     //   .then(result => {
//     //     console.log(result.user);
//     //   })
//     //   .catch(error => {
//     //     console.error(error);
//     //   });
//   }

//   signOut() {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//       console.log('User signed out');
//     }).catch(error => {
//       console.error(error);
//     });
//   }
// }


// import { Component } from '@angular/core';
// import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
// import { inject } from '@angular/core';

// @Component({
//   selector: 'app-google-signin',
//   templateUrl: './google-signin.component.html',
//   styleUrls: ['./google-signin.component.css']
// })
// export class GoogleSigninComponent {
//   private auth = inject(Auth);

//   async signInWithGoogle() {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(this.auth, provider);
//       console.log('User signed in with Google');
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//     }
//   }
// }

import { Component } from '@angular/core';
// import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
// import { inject } from '@angular/core';

@Component({
  selector: 'app-google-signin',
  // standalone: true,
  // providers: [Auth],
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent {
  // private auth = inject(Auth);
  // constructor(public afAuth: AngularFireAuth) {}
  constructor(private authService: AuthService) { }


  async signInWithGoogle() {
    // this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // const auth = getAuth();
    this.authService.login();
    // const provider = new GoogleAuthProvider();
    // try {
    //   await signInWithPopup(this.auth, provider);
    //   console.log('User signed in with Google');
    // } catch (error) {
    //   console.error('Error during sign-in:', error);
    // }
  }
}
