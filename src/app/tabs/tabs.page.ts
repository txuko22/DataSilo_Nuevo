import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  private storage: Storage | null = null;

  constructor(private router: Router,private _storage: Storage) {}

   async ngOnInit() {
    this.storage = await this._storage.create();
    this.validarUser()

  }
  

  async  validarUser() {
    let usuariaAcceso = await this.storage?.get('user')
    console.log(usuariaAcceso);
    if (usuariaAcceso) {
      
    }else{
      this.router.navigate(['landing']);
    }
   
  }
}


