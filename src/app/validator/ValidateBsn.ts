import { AbstractControl } from '@angular/forms';

export function ValidateBsn(control: AbstractControl) {
    const bsn: string = control.value;

    if (bsn === "") {
        return null;
    }

    if (!/^\d+$/.test(bsn)) {
        return { containsNonAlphanumerics: true }
    }

    if (bsn.length !== 9) {
        return { hasInvalidCharCount: true };
    }

    const numbers = bsn.split('').map(n => parseInt(n, 10));

    const checksum = (numbers[0] * 9) +
        (numbers[1] * 8) +
        (numbers[2] * 7) +
        (numbers[3] * 6) +
        (numbers[4] * 5) +
        (numbers[5] * 4) +
        (numbers[6] * 3) +
        (numbers[7] * 2) +
        (numbers[8] * -1);

    if (checksum % 11 !== 0) {
        return { invalidBsn: true }
    }

    return null;
}