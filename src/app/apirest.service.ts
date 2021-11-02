import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = []
  private apiUrl = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  getUsers()
  {
    let url = this.apiUrl + 'users';
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data : []) =>
      {
        data.forEach(item => {this.listado.push(item) });
        console.table(this.listado);
      },
      error => { console.log("error en la solicitud")}
      )
    })
  }
}
