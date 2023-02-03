import { OnDestroy } from '@angular/core';
import { ReplaySubject} from 'rxjs';
import { HttpParams } from '@angular/common/http';

/**
 * Convert given object to query string.
 * @param source Object
 */
export function buildQueryParams(source?: Object): HttpParams {
    if (!source) return;
    let target: HttpParams = new HttpParams();
    Object.keys(source).forEach((key: string) => {
        const value: string | number | boolean | Date = source[key];
        if ((typeof value !== 'undefined') && (value !== null)) {
            target = target.append(key, value.toString());
        }
    });
    return target;
}

/**
 * Determines whether passed object is empty.
 * @param object Object to check.
 */
export function isEmptyObject(object: object = {}): boolean {
    return object.constructor === Object && Object.keys(object).length === 0;
}

/**
 * Remove keys with null values from object.
 * @param object Object to execute on.
 * @returns Object with keys only containing a value.
 */
export function removeNullFromObject(object: {}) {
    Object.keys(object).forEach(key => {
        if (object[key] === null) delete object[key];
    });

    return object;
}

/**
 * Determines whether passed component was destroyed.
 * @param component Angular component.
 */
export function componentDestroyed(component: OnDestroy) {
    const oldNgOnDestroy = component.ngOnDestroy;
    const destroyed$ = new ReplaySubject<void>(1);

    component.ngOnDestroy = () => {
        oldNgOnDestroy.apply(component);
        destroyed$.next(undefined);
        destroyed$.complete();
    };

    return destroyed$;
}
