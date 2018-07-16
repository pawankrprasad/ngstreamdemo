import { CameraStoreService } from './../services/camera-store.service';
import { StreamService } from './../services/stream-service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { flushMicrotasks } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import * as moment  from 'moment'

import {catchError, map} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-search-label',
  templateUrl: './search-label.component.html',
  styleUrls: ['./search-label.component.css']
})
export class SearchLabelComponent implements OnInit {

  frm: FormGroup;

  fromData: Date;
  toData: Date;
  selectedCamera: Camera;
  searchLabel: String;
  loading=false;
  searchREsult: any;

  constructor(private streamService: StreamService,
    private router:Router,
    private cameraStoreService: CameraStoreService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder, private datePipe: DatePipe) {

  }


  createForm() {
    this.frm = this.fb.group({
      label: new FormControl('',Validators.required),
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required)
    });

    let defaultCriteria:searchFields=this.cameraStoreService.getSearchCriteria();
    if(defaultCriteria){
      this.frm.setValue(defaultCriteria);
      this.search(defaultCriteria);
    }
  }

  get label(){
    return this.frm.controls.label;
  }

  get startDate(){
    return this.frm.controls.startDate;
  }

  get endDate(){
    return this.frm.controls.endDate;
  }


  ngOnInit() {

    if (this.cameraStoreService.camera) {
      this.selectedCamera = this.cameraStoreService.camera;
    }
    this.createForm();
    this.cameraStoreService.change
      .subscribe(camera => {
        this.selectedCamera = camera;
      })
  }
  
  play(event,item){
    event.preventDefault();
    this.router.navigate(['search/menifest'], 
    { queryParams: { 'file': item.manifest_file_name, 'start': item.seconds} });
  }

  search(frmData: searchFields) {
    if(this.selectedCamera && this.frm.valid){
    this.spinner.show();
    this.cameraStoreService.setSearchCriteria(frmData);

    this.streamService.getStreamMetaData(
      this.selectedCamera.id,
      this.extractStringDate(frmData.startDate),
      this.extractStringDate(frmData.endDate),
      frmData.label
    ).subscribe(data => {
      //this.searchREsult = data.result_set;
      this.searchREsult=this.convertToTableFormat(data.result_set)
      this.spinner.hide();
    })
  }
  }

  extractStringDate(date: Date) {
    if (date instanceof Date) {
      return moment(date).utc().format("YYYY-MM-DD HH:mm:ss")
    }
    return "";
  }

  convertToTableFormat(data: any) {

    let finalResult=[];
    
    let result = _.groupBy(data,  item => item.manifest_file_name);
    let final = _.forEach(result, function (value, key) {
      result[key] =  _.groupBy(result[key], function (item) {
        return item.label;
      });
    });


     _.forEach(final,function(items,key){
        _.forEach(items,function(v,k){
          v[0].count=v.length;
          finalResult.push(v[0]);
        })
    });
    console.log(finalResult);
    return finalResult;
  }
}
