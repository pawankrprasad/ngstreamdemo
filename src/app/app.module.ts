import { StreamService } from './services/stream-service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule, Messages} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { NgxSpinnerModule } from 'ngx-spinner';




import {Routes, RouterModule} from '@angular/router';




import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LiveStreamComponent } from './live-stream/live-stream.component';
import { SearchLabelComponent } from './search-label/search-label.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenifestComponent } from './menifest/menifest.component';
import { SampleComponent } from './sample/sample.component';
import { StringToTime } from './pipe/string-time.pipe';



const routes:Routes=[
  { path: '', redirectTo: '/live', pathMatch: 'full' },
  {path:'', component:LayoutComponent, children:[
    {path:'live', component:LiveStreamComponent},
    {path:'search', component:SearchLabelComponent},
    {path:'search/menifest', component:MenifestComponent},
  ]}
]


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LiveStreamComponent,
    SearchLabelComponent,
    MenifestComponent,
    SampleComponent,
    StringToTime
],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    NgxSpinnerModule,
    ProgressSpinnerModule,
    RouterModule.forRoot(routes,{useHash:true})
  ],
  providers: [StreamService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
