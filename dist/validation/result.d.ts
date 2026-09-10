export const CHECKS: string[];
export function requestedChecks(operation: any): string[];
export function makeResult(schemaVersion: any, diagnostics: any, coverage: any, unsupported: any): {
    outcome: string;
    diagnostics: any;
    versions: {
        contract: string;
        validator: string;
        package: string;
        schema: any;
    };
    coverage: {
        complete: any;
        requested: any;
        completed: any;
        skipped: any;
        unsupported: any;
        provisional: any;
    };
};
