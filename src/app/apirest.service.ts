import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = []
  datos: any
  private apiURL = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) { }

  getUsers()
  {
    let url = this.apiURL + 'users';
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

  getUser(id: String)
  {
    let url = this.apiURL + 'users/' + id;
    return new Promise((resolve, reject) => 
    {
      this.http.get(url).subscribe((data : any) => 
      {
        this.datos = data;
        console.log(this.datos);
      },
      error => { console.log("error en la solicitud")
      })
    })
  }
}
