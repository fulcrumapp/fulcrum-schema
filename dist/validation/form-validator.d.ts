export function validate(request: any): {
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
export function checkCompatibility(previous: any, candidate: any, diagnostics: any): void;
export function sortDiagnostics(diagnostics: any): any;
