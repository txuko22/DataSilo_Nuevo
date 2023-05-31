import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DatasiloService } from 'src/app/providers/ccdatos/datasilo.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  loading: any;
  hidden: boolean = false;
  private storage: Storage | null = null;

  constructor(private router: Router,public navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
     private dataSilo: DatasiloService, private _storage: Storage) {
    this.init();
   }

  async init(){
    this.storage = await this._storage.create();
  }

  ngOnInit() {
    this.storage?.get('user').then((user)=>{ // Cambio
      if(user){
        this.email = user.email;
        this.password = user.password;
        let formData = new FormData();
        formData.append('email',this.email);
        formData.append('password',this.password);
        this.login(formData);
      }else{
        this.hidden = false;
      }
    });
  }

  hideShowPassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  loginValidate(){
    let expRegEmail = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    if(this.email !== ''){
      if(expRegEmail.test(this.email)){
        if(this.password !== ''){
          if(this.password.length >= 4){
            let formData = new FormData();
            formData.append('email',this.email);
            formData.append('password',this.password);
            this.login(formData);
          }else{
            this.presentToast('La contraseña debe tener mínimo 4 caracteres');
          }
        }else{
          this.presentToast('Contraseña obligatoria');
        }
      }else{
        this.presentToast('La dirección de correo no es válida');
      }
    }else{
      this.presentToast('Correo electrónico obligatorio');
    }
  }

  login(formData: any){ // Cambio
    this.presentLoading();
    this.dataSilo.getData('login',formData).subscribe(
      (data: any) => { // Cambio
        console.log(data);
        setTimeout(()=>{
          this.loading.dismiss();
          if(data.id){
            data.password = this.password;
            this.storage?.set('user',data);
            this.registrar(data.id);
            this.sessionRegister(data);
          }else if(data.status === 401){
            this.presentToast('Usuario o contraseña incorrectos.');
          }
        },1200);
      },
      (err: any) => { // Cambio
        console.log(err);
        this.presentToast('Servidor no disponible en estos momentos. Inténtalo más tarde.');
      });
  }

  sessionRegister(user: any){ // Cambio
    let formData = new FormData();
    formData.append('user_id',user.id);
    formData.append('key',user.api_token);
    this.dataSilo.getData('session',formData).subscribe((response: any)=>{ // Cambio
      console.log(response,'session response');
    });
  }

  showReserPasswordPage(){}

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Validando credenciales...'
    });
    this.loading.present();
  }

  async presentToast(msg: string) { // Cambio
    const toast =await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    (await toast).present();
  }  

     registrar(user_id: any){ // Cambio

  //   /*this.oneSignal.startInit('9b83566f-d0b7-4f11-a339-67248f9afe97', '28427314032');

  //   this.oneSignal.getIds().then((ids) => {
  //     let params = new FormData();
  //     params.append('user',user_id);
  //     params.append('pushid',ids.userId);
  //     this.datawine.getData('pushid',params).subscribe((response)=>{
  //       if(response > 0){
  //         this.storage.set('pushid',ids.userId);
  //       }
  //     });
  //   });

  //   this.oneSignal.endInit();*/

  //   //this.dataCcdatosProvider.getData('session',{user_id: user_id}).subscribe();

  this.router.navigate(['']);

   }
  
}
