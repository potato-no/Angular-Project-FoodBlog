import { ValidatorFn } from "@angular/forms";

export function appEmailValidator(domains: string[]): ValidatorFn {
    // /^[^@]{6,}@gmail\.(com|bg)$/
    const domainStr = domains.join('|');
    const re =  new RegExp(`^[^@]{6,}@gmail\.(${domainStr})$`);
    return (control) => {
        return (control.value === '' || re.test(control.value) ? null : { appEmailValidator: true });
    }
}