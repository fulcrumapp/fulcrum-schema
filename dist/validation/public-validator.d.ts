export function validateForm(request: any): {
    contract_version: string;
    outcome: string;
    diagnostics: any;
    coverage: {
        requested: any;
        completed: any;
        skipped: any;
        unsupported: any;
        unverified: any;
        failures: any;
    };
    versions: any;
};
