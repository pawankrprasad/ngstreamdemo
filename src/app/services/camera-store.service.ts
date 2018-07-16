import { Injectable, Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraStoreService {

  camera:Camera;
  searchCriteria:searchFields;

constructor() { }

@Output() change: EventEmitter<Camera> = new EventEmitter();

  setCamera(activeCamera:Camera) {
    this.camera=activeCamera;
    this.change.emit(this.camera);
  }

  setSearchCriteria(searchCriteria:searchFields){
    this.searchCriteria=searchCriteria;
  }
  getSearchCriteria(){
    return this.searchCriteria;
  }
}
