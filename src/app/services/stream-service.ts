import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient, ) { }

  getServerMetaData(){
      return this.http.get<any>(`${environment.API_PATH}/server_metadata`);
  }

  getClients() {
    return this.http.get<any>(`${environment.API_PATH}/clients`);
  }

  getCameras(cameraId:Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'camera_id': `${cameraId}`
      })
    };
    return this.http
    .get<any>(`${environment.API_PATH}/cameras`);
  }
  getClientCameras(clientId:Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'client_id': `${clientId}`
      })
    };
    return this.http.get<any>(`${environment.API_PATH}/client_cameras`,httpOptions);
  }

  getStreamDetails(cameraId:Number, startTime:string, endTime:string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'camera_id': `${cameraId}`,
        'start_time': startTime,
        'end_time': endTime
      })
    };
    return this.http.get(`${environment.API_PATH}/stream_details`,httpOptions);
  }

  getLiveStream(cameraId:Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'camera_id': `${cameraId}`,
        'live':'True'
      })
    };
    return this.http.get<any>(`${environment.API_PATH}/stream_details`,httpOptions);
  }

  getStreamMetaData(cameraId:Number, startTime:string, endTime:string, labels:string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'camera_id': `${cameraId}`,
        'start_time': startTime,
        'end_time': endTime,
        'label':labels
      })
    };
    return this.http.get<any>(`${environment.API_PATH}/stream_metadata`,httpOptions);
  }
}

