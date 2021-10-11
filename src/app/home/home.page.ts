import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado = [];
  constructor(public toastController: ToastController,
              public alertController: AlertController) {}

  
  ngOnInit()
  {

  }

  async onClick(nombre: HTMLInputElement)
  {
    let valor = nombre.value;

    if (valor.trim().length >= 3)
    {
      for (let ind = 1; ind <= localStorage.length; ind++)
      {
        if (valor.toUpperCase() == localStorage.getItem("" + ind).toUpperCase())
        {
          const toast = await this.toastController.create({
            message: 'El nombre ingresado ya existe',
            duration: 2000,
            color: "danger",
            position: "middle"
          });
          toast.present();
          return;
        }
      }

      const cantidad = localStorage.length + 1
      localStorage.setItem(cantidad.toString(), nombre.value);
      nombre.value = "";
      const toast = await this.toastController.create({
        message: 'El nombre fue guardado',
        duration: 2000,
        color: "success",
        position: "middle"
      });
      toast.present();
    }
    else
    {
      const toast = await this.toastController.create({
        message: 'No se especifico el nombre',
        duration: 2000,
        color: "danger"
      });
      toast.present();
    }
  }

  listar()
  {
    this.listado = [];
    let ind = 1;
    for (let ind = 1; ind <= localStorage.length; ind++);
    {
      this.listado.push(localStorage.getItem(ind.toString()));
    }
  }

  async limpiar()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar datos del Local Storage',
      message: '<strong>¿Estás seguro?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        }, {
          text: 'Si',
          handler: () => {
            localStorage.clear();
          }
        }
      ]
    });
    await alert.present();
  }

}

