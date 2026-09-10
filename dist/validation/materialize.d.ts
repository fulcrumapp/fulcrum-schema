export function hasOwn(value: any, key: any): boolean;
export function materialize(request: any): {
    operation: any;
    candidate: any;
    previous: undefined;
    errors: never[];
} | {
    operation: any;
    candidate: undefined;
    previous: any;
    errors: {
        code: string;
        path: string;
        message: string;
    }[];
} | {
    operation: any;
    candidate: {};
    previous: any;
    errors: never[];
};
