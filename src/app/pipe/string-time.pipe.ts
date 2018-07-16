import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment-timezone';

@Pipe({
    name:"stringTodate"
})
export class StringToTime implements PipeTransform{

    transform(date:string){
        let utcDate = moment.tz(date,"UTC");
        return moment(new Date(utcDate))
        .format("YYYY-MM-DD HH:mm:ss");
    }

}