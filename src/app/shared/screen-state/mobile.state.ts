import { Type } from '@angular/core';

export class ResponsiveComponents {

    private components: Map<Type<any>, MobileDesctopComponents> = new Map();

    add(rootComponent: Type<any>, mobileComponent: Type<any>, desctopComponent: Type<any> = null) {
        if (desctopComponent === null) {
            desctopComponent = rootComponent;
        }
        this.components.set(rootComponent, {mobileComponent: mobileComponent, desctopComponent: desctopComponent});
    }

    get(rootComponent: Type<any>): Type<any> {
        const foundComponents = this.components.get(rootComponent);

        return foundComponents ? 
            isMobileVersion() ? 
                foundComponents.mobileComponent : 
                foundComponents.desctopComponent :
            rootComponent;
    }

}


interface MobileDesctopComponents {
    mobileComponent: Type<any>;
    desctopComponent: Type<any>;
}

export function isMobileVersion(): boolean {
    return window.innerWidth < 768;
}