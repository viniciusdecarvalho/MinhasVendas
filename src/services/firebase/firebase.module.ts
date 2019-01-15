import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBQWeJ8zQEZme87PlhrQkP1hlmFJngaPyc",
  authDomain: "minhasvendas-14060.firebaseapp.com",
  databaseURL: "https://minhasvendas-14060.firebaseio.com",
  projectId: "minhasvendas-14060",
  storageBucket: "minhasvendas-14060.appspot.com",
  messagingSenderId: "841213376810"
};

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ]
})
export class FirebaseModule { }
