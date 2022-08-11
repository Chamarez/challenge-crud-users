import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../shared/models/registerUser.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(regData: RegisterUser):Observable<any>{
    return this.http
    .post(`${environment.API_URL}/auth/sign-up`, regData)
}
}
