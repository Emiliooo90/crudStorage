import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  listado = [];
  nombreUsuario = "";
  fonoUsuario = "";
  rutUsuario = "";

  constructor(private crud: CrudService,
              private alertController: AlertController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.crud.set("1", "Bob esponja");

    const nombre = this.crud.get("1");
    nombre.then(x => console.log(x));
  }

  async agregar(rut: HTMLInputElement, nombre: HTMLInputElement, fono: HTMLInputElement)
  {
    const datos = [{"rut": rut.value, "nombre": nombre.value, "fono": fono.value}];
    const valor = await this.crud.get(rut.value);

    if (valor.length > 0)
    {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'El rut ya existe, ¿Desea cambiar los datos?',
        message: '<strong>¿Estás seguro?</strong>',
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          }, {
            text: 'Si',
            handler: () => {
              this.crud.set(rut.value, datos);
              console.log(datos);
              rut.value = "";
              nombre.value = "";
              fono.value = "";
            }
          }
        ]
      });
      await alert.present();
    }
    else
    {
      this.crud.set(rut.value, datos);
      console.log(datos)
      rut.value = "";
      nombre.value = "";
      fono.value = "";
    }
  }

  async buscar(rut: HTMLInputElement)
  {
    const valor = await this.crud.get(rut.value);
    this.nombreUsuario = valor[0].nombre;
    this.fonoUsuario = valor[0].fono;
    this.nombreUsuario = "";
    this.fonoUsuario = "";
  }
  
  listar()
  {
    this.listado = this.crud.listar()

  }

  async eliminar(rut: HTMLInputElement)
  {
    this.crud.eliminar(rut.value);
    const toast = await this.toastController.create({
      message: 'El usuario fue eliminado',
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }
}
