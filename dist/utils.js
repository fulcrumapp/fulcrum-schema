"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static tableName(schema, prefix, quote, table) {
        return Utils.escapedSchema(schema, quote) + Utils.escape((prefix || '') + table, quote);
    }
    static escapeIdentifier(identifier) {
        if (identifier == null || identifier.length === 0) {
            return '';
        }
        const needsQuotes = /[^_A-Z0-9]/i.test(identifier) ||
            /^[0-9]/.test(identifier);
        if (needsQuotes) {
            return '"' + (identifier.replace(/"/g, '""')) + '"';
        }
        return identifier;
    }
    static escapedSchema(schema, quote) {
        if (schema == null || schema.length === 0) {
            return '';
        }
        return Utils.escape(schema, quote) + '.';
    }
    static escape(identifier, quote) {
        if (identifier == null || identifier.length === 0) {
            return '';
        }
        quote = quote || '"';
        const escaped = identifier.replace(new RegExp(quote, 'g'), quote + quote);
        return quote + escaped + quote;
    }
    static flattenElements(elements, recurseRepeatables, assignParent, parent) {
        if (recurseRepeatables == null) {
            recurseRepeatables = true;
        }
        if (assignParent == null) {
            assignParent = false;
        }
        const flat = [];
        for (const element of elements) {
            if (assignParent) {
                element.parent = parent;
            }
            flat.push(element);
            let recurse = true;
            if (!recurseRepeatables && element.type === 'Repeatable') {
                recurse = false;
            }
            if (recurse && element.elements) {
                const children = Utils.flattenElements(element.elements, recurseRepeatables, assignParent, element);
                Array.prototype.push.apply(flat, children);
            }
        }
        return flat;
    }
}
exports.default = Utils;
//# sourceMappingURL=utils.js.map