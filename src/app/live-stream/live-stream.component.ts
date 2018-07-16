import { StreamService } from './../services/stream-service';
import { CameraStoreService } from './../services/camera-store.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { filter, map, flatMap } from 'rxjs/operators';


declare var Hls: any;

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer:ElementRef;

  selectedCamera:Camera;
  hasLiveVideo:boolean=false;
  hls:any;

  msgs:any=[];

  constructor(private streamService:StreamService,
    private cameraStoreService:CameraStoreService) { 

    }

  ngOnInit() {
    if(this.cameraStoreService.camera){
      this.selectedCamera=this.cameraStoreService.camera;
      this.getLiveMetadata();
    }    
    this.cameraStoreService.change
    .subscribe(camera => {
      this.selectedCamera=camera;
      this.getLiveMetadata();
    });
  }

  getLiveMetadata(){

   const promise= this.streamService.getLiveStream(this.selectedCamera.id)
                  .pipe(map((data:any)=>data.result_set))
                  .subscribe(data=>{
    if(data.length>0){
      this.hasLiveVideo=true;
      this.msgs=[];
      this.initLiveVideo(data[0].manifest_file_name);
    }else{
      this.msgs=[];
      this.msgs.push({severity:'info', summary:'Not found', detail:'No live stream video found.'});
    }
    })

  }


  initLiveVideo(fileName:string){
    if (Hls.isSupported()) {
      this.hls = new Hls();
      let selfHls=this.hls;
      this.hls.on(Hls.Events.MEDIA_ATTACHED, function() {
        //selfHls.loadSource('https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8');
        selfHls.loadSource(`/efs/static_folder/${fileName}`);
      });      
      selfHls.on(Hls.Events.MANIFEST_PARSED, function () {
       
        console.log("manifest loaded, found ");
        
        this.videoplayer.nativeElement.play();
      });
      selfHls.attachMedia(this.videoplayer.nativeElement);
    }
    else if (this.videoplayer.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoplayer.nativeElement.src = `/efs/static_folder/${fileName}`;
      //this.videoplayer.nativeElement.src = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
      this.videoplayer.nativeElement.addEventListener('canplay', function () {
        this.videoplayer.nativeElement.play();
      });
    }
  }

  ngOnDestroy(): void {
    if(this.hls){
      this.hls.destroy();
    }
  }
}
