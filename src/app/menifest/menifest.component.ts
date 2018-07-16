import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var Hls: any;

@Component({
  selector: 'app-menifest',
  templateUrl: './menifest.component.html',
  styleUrls: ['./menifest.component.css']
})
export class MenifestComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer:ElementRef;
  
  manifestName:String;
  startTime:Number
  hls:any;

  constructor(private activatedRoute:ActivatedRoute) { 
  
  
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.manifestName = params['file'];
      this.startTime = +params['start']; 
      this.initLiveVideo(this.startTime,this.manifestName);     
  });
    
  }

  initLiveVideo(startTime, fileName){
    if (Hls.isSupported()) {
      console.log("Hls Supported");
      this.hls = new Hls();
      let selfHls=this.hls;
      selfHls.on(Hls.Events.MEDIA_ATTACHED, function() {
        //selfHls.loadSource('https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8');
        selfHls.loadSource(`/efs/static_folder/${fileName}`);
      });      
      selfHls.on(Hls.Events.MANIFEST_PARSED, function () {
        selfHls.startLoad(startTime);
        console.log("manifest loaded, found ");
        
        this.videoplayer.nativeElement.play();
      });
      selfHls.attachMedia(this.videoplayer.nativeElement);
    }
    else if (this.videoplayer.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.videoplayer.nativeElement.src = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8';
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
