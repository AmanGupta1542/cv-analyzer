import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from '@angular/fire/auth';
import { getDatabase, ref, set, get, child } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  // private db = getDatabase();

  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore ) {
    // Subscribe to the authentication state to maintain the user object
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
   }

  async signInWithGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const result = await this.afAuth.signInWithPopup(googleAuthProvider);
    const user = result.user;

    if (user) {
      const userRef = this.firestore.collection('users').doc(user.uid);
      const userSnapshot = await userRef.get().toPromise();

      if (!userSnapshot?.exists) {
        await userRef.set({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          tokens: 10 // Assigning 10 tokens initially
        });
      } else {
        // If the user document already exists, you can update it if necessary
        const existingData: any = userSnapshot.data();
        await userRef.set({
          // ...existingData,
          lastLogin: new Date()
        }, { merge: true });
      }
    }
  }

  // private async saveUser(user: firebase.User | null) {
  //   if (user) {
  //     const userRef = ref(this.db.database, `users/${user.uid}`);
  //     const userSnapshot = await get(userRef);
  //     if (!userSnapshot.exists()) {
  //       await set(userRef, {
  //         uid: user.uid,
  //         email: user.email,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //         tokens: 10 // Assigning 10 tokens initially
  //       });
  //     }
  //   }
  // }

  private storeUserDataInLocalStorage(user: firebase.User | null) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  autoLogin() {
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  async signOut() {
    await this.afAuth.signOut();
  }

}