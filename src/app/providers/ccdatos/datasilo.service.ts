import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatasiloService {

  private urlBase:any;
  private metodo: any;
  
  constructor(private http: HttpClient) { 
    console.log('Hello datasilo Provider');
  }
  getData(action:any,params:any){
    switch(action){
      case 'login':
        this.urlBase = "https://datasilo.ccdatos.com/api/user/login";
        this.metodo = 'POST';
        break;
      case 'session':
        this.urlBase = "https://datasilo.ccdatos.com/api/user/session";
        this.metodo = 'POST';
        break;
      case 'userDevices':
        this.urlBase = "https://datasilo.ccdatos.com/api";
        this.urlBase = this.urlBase + '/user/' + params.id + '/devices';
        this.metodo = 'GET';
        break;
      case 'updateAlarm':
        this.urlBase = "https://datasilo.ccdatos.com/api/user/alarmas/update";
        this.metodo = 'POST';
        break;
      case 'lastreader':
        this.urlBase = "https://datasilo.ccdatos.com/api";
        this.urlBase = this.urlBase + '/DeviceReader/obtain/key=1234&device=' + params.device;
        this.metodo = 'GET';
        break;
      case 'lastreadermulti':
        this.urlBase = "https://datasilo.ccdatos.com/api";
        this.urlBase = this.urlBase + '/DeviceReader/obtain/key=1234&devices=' + params.devices;
        this.metodo = 'GET';
        break;
      case 'history':
        this.urlBase = "https://datasilo.ccdatos.com/api";
        this.urlBase = this.urlBase + '/DeviceReader/obtain/key=1234&device=' + params.device + '&start=' + params.start + '&end=' + params.end + '&timescale=' + params.escala;
        this.metodo = 'GET';
        break;
      case 'alarmHistory':
        this.urlBase = "";
        this.urlBase = params.page;
        this.metodo = 'GET';
        break;
      case 'pushid':
          this.urlBase = "https://datasilo.ccdatos.com/api/alarma/pushid/store";
          this.metodo = 'POST';
          break;
      default:
        let observable = Observable.create((subscriber:any) => {
          subscriber.next([]);
          subscriber.complete();
        });
        return observable;
    }
    switch(this.metodo){
      case 'POST':
        return this.http.post(this.urlBase,params);
      case 'GET':
        return this.http.get(this.urlBase);
      default:
        return this.http.get(this.urlBase);
    }

  }

  private catchError(error: Response | any){
    return [error];
  }

  private logResponse(res: Response){
    //console.log(res);
  }
  
  private extractData(res: Response){
    return res.json();
  }
}
