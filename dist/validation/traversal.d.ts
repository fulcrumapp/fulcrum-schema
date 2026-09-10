export const MAX_ELEMENTS: 1400;
export const MAX_DEPTH: 100;
export const MAX_POINTER_SEGMENT_LENGTH: 256;
export function pointerPart(value: any): string;
export function appendPointer(path: any, value: any): string;
export function isObject(value: any): boolean;
export function indexForm(form: any): {
    elements: never[];
    byKey: any;
    byDataName: any;
    scopes: any;
    errors: never[];
    cyclic: boolean;
    tooDeep: boolean;
    tooLarge: boolean;
    diagnosticOverflow: boolean;
    visited: number;
};
