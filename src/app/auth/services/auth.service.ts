import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interface/auth.interface';
import { tap, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth{
    return {...this._auth!};
  }

  constructor(private http: HttpClient) { }
  
  verificaAuth(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(//map transforma las cosas
              tap(res => console.log("verifica", res)),
              map( auth => {
                this._auth = auth;
                return true;
              })
            )
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe( //tap realiza algo antes de enviar la respuesta
              tap( auth => this._auth = auth),
              tap( auth => localStorage.setItem('token',auth.id))
            );
  }

  logOut(){
    this._auth = undefined;
  }

  
}
