import { Type } from '@angular/core';

export function getComponentForCurrentScreenState(desctopComponentt: Type<any>, mobileComponent: Type<any>): Type<any> {
    return window.innerWidth < 768 ? mobileComponent : desctopComponentt;
}

export function isMobileVersion(): boolean {
    return window.innerWidth < 768;
}
