import { AbstractControl } from '@angular/forms';
import * as moment from "moment"

export function ValidateDate(control: AbstractControl) {
    const date = moment(control.value);
    
    if (!date.isValid()) {
        return {
            invalidDate: true
        }
    }


    return null;
}