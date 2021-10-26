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

    if (valor != null && valor.length > 0)
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
      const toast = await this.toastController.create({
        message: 'Los datos fueron guardados',
        duration: 300,
        color: "success",
        position: 'middle'
      });
      toast.present();
    }
  }

  async buscar(rut: HTMLInputElement)
  {
    if (rut.value.trim().length == 0)
    {
      const toast = await this.toastController.create({
        message: 'Debe especificar un rut válido',
        duration: 3000,
        color: "danger"
      });
      toast.present();
    }
    else
    {
      const valor = await this.crud.get(rut.value);

      if (valor == null)
      {
        const toast = await this.toastController.create({
          message: 'El rut no existe',
          duration: 3000,
          color: "danger"
        });
        toast.present();
      }
      this.nombreUsuario = valor[0].nombre;
      this.fonoUsuario = valor[0].fono;
      this.rutUsuario = rut.value;
      this.listado = []
      rut.value = "";
    }
  }
  
  listar()
  {
    this.listado = this.crud.listar()

  }

  async eliminar()
  {
    this.crud.eliminar(this.rutUsuario);
    const toast = await this.toastController.create({
      message: 'El usuario fue eliminado',
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }
}
