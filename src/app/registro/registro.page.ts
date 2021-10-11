import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  listado = [];

  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.crud.set("1", "Bob esponja");

    const nombre = this.crud.get("1");
    nombre.then(x => console.log(x));
  }

  agregar(rut: HTMLInputElement, nombre: HTMLInputElement, fono: HTMLInputElement)
  {
    const datos = "{rut':'" + rut.value + "','nombre':'" + nombre.value + "','fono':'" + fono.value + "'}";
    this.crud.set(rut.value, datos);
  }

  buscar(rut: HTMLInputElement)
  {
    const x = this.crud.get(rut.value);
    x.then(xx => this.listado.push(xx));
  }
}
