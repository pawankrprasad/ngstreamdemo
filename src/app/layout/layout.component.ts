import { CameraStoreService } from './../services/camera-store.service';
import { StreamService } from './../services/stream-service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/message';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [MessageService]
})
export class LayoutComponent implements OnInit {
  version:string = require( '../../../package.json').version;
  camera:any;
  clients:any=[];
  selectedCamera={};
  selectedClient={};
  msgs: Message[] = [];

  constructor(private streamService:StreamService,
    private cameraStoreService: CameraStoreService,
    private messageService: MessageService
  ) { 
    
    this.streamService.getClients()
    .subscribe(data=>{
       this.clients=data.result_set;
    });    
  }
  clientChanged(event) {
    let clientId=event.value.id;
    this.streamService.getClientCameras(clientId)
    .subscribe(data=>{
      if(data.count>0){
        this.camera=data.result_set;
      }else{
        this.camera=[];
        this.selectedCamera={};
      }
    }); 
  }

  cameraChanged(event){
    let activeCamera=event.value;
    if(activeCamera){
      this.msgs=[];
    }
    this.cameraStoreService.setCamera(activeCamera);
  }

  ngOnInit() {
    this.showCameraWarning();
  }

  showCameraWarning(){
    this.msgs.push({severity:'warn', summary:'Camera Not Selected', detail:'Please Select the camera form the dropdown.'});
  }

}
