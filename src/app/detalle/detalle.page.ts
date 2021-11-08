import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  constructor(private activatedRouter: ActivatedRoute,
              private apirestService: ApirestService) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(p => {
      const id = p.get('id');
      console.log(id);
      this.apirestService.getUser(id);
    })
  }

}
