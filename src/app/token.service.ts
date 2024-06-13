import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ref, get } from '@firebase/database';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private db: AngularFireDatabase) {}

  async getUserTokens(uid: string): Promise<number> {
    const tokenRef = ref(this.db.database, `users/${uid}/tokens`);
    const tokenSnapshot = await get(tokenRef);
    if (tokenSnapshot.exists()) {
      return tokenSnapshot.val();
    }
    return 0;
  }
}
