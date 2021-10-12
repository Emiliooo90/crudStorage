import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  listado = [];
  nombreUsuario = "";
  fonoUsuario = "";

  constructor(private crud: CrudService) { }

  ngOnInit() {
    this.crud.set("1", "Bob esponja");

    const nombre = this.crud.get("1");
    nombre.then(x => console.log(x));
  }

  agregar(rut: HTMLInputElement, nombre: HTMLInputElement, fono: HTMLInputElement)
  {
    const datos = [{"rut": rut.value, "nombre": nombre.value, "fono": fono.value}];
    this.crud.set(rut.value, datos);
    console.log(datos);
    rut.value = "";
    nombre.value = "";
    fono.value = "";
  }

  async buscar(rut: HTMLInputElement)
  {
    const valor = await this.crud.get(rut.value);
    this.nombreUsuario = valor[0].nombre;
    this.fonoUsuario = valor[0].fono;
  }
  
  listar()
  {
    this.listado = this.crud.listar()

  }
}
