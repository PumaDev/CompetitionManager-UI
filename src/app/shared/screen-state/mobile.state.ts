import { Type } from '@angular/core';

export function getComponentForCurrentScreenState(desctopComponentt: Type<any>, mobileComponent: Type<any>): Type<any> {
    console.log("Windows width: " + window.innerWidth);
    return window.innerWidth < 768 ? mobileComponent : desctopComponentt;
}

export function isMobileVersion(): boolean {
    console.log("Windows width: " + window.innerWidth);
    return window.innerWidth < 768;
}
