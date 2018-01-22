import { Network } from '@ionic-native/network';
import { Injectable } from '@angular/core';


/*
  Generated class for the CheckConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CheckConnectionProvider {

  constructor(private network: Network) {
    console.log('Hello CheckConnectionProvider Provider');
  }
  getConnectionStatus(){
    this.network.onDisconnect().subscribe(() => {
     return true;
    });
  }

}
