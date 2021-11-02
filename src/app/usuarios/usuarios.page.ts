import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  listado = []
  constructor(private api: ApirestService) { }

  ngOnInit() {
    this.api.getUsers();
    this.listado = this.api.listado;
  }

}
