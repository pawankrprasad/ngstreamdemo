import { environment } from './../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <span>{{version}}</span>
  <router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  

  constructor(){
  }

}
