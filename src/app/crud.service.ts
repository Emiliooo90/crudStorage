import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init()
  {
    await this.storage.create();
  }

  async set(key:string, valor:string)
  {
    await this.storage.set(key, valor);
  }

  get(key:string)
  {
    return this.storage.get(key);
  }
}
