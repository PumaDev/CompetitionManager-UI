import { Type } from '@angular/core';

export function getComponentForCurrentScreenState(desctopComponentt: Type<any>, mobileComponent: Type<any>): Type<any> {
    return isMobileVersion() ? mobileComponent : desctopComponentt;
}

export function isMobileVersion(): boolean {
    return window.innerWidth < 768;
}