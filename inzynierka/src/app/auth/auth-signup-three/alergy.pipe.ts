import { Pipe, PipeTransform} from '@angular/core';
import { Allergy } from './auth-signup-three.component';
import {filter} from "rxjs/operators";

@Pipe({
    name: 'alergyFilter',
})
export class AlergyPipe implements PipeTransform {
    transform(value: any, filterType: number, propname: string): any {
        if (value.length === 0) {
            return value;
        }
        const resultArray = [];
        for (const item of value){
            if (item[propname] === filterType){
                resultArray.push(item);
            }
        }
        return resultArray;
    }
}
export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
        return items.filter(item => {
            let notMatchingField = Object.keys(filter)
                .find(key => item[key] !== filter[key]);

            return !notMatchingField; // true if matches all fields
        });
    }
}
