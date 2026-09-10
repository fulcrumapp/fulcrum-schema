declare const schema: {
  dialect: string;
  version: string;
  oldForm: unknown;
  newForm: unknown;
  tableSchema: string | null;
  tablePrefix: string | null;
  includeMetadata: boolean;
  compareOrganization(): string;
  compareFormSchemas(oldForm: unknown, newForm: unknown, options?: object): string;
  compareForms(): string;
  validateForm(request: unknown): {
    contract_version: 'v1';
    outcome: 'valid' | 'invalid' | 'incomplete' | 'unavailable';
    diagnostics: Array<{
      code: string;
      severity: 'error' | 'warning' | 'info';
      message: string;
      path: string;
      fix?: string;
      range?: object;
    }>;
    coverage: {
      requested: string[];
      completed: string[];
      skipped: Array<object>;
      unsupported: Array<object>;
      unverified: Array<object>;
      failures: Array<object>;
    };
    versions: {
      validator: string;
      schema: string | null;
      runtime: string | null;
    };
  };
};

export = schema;
