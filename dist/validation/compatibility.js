'use strict';
const { indexForm, isObject } = require('./traversal');
const { ELEMENT_TYPES, add } = require('./rules');
/*
 * Compatibility is a local comparison between complete candidates.  Keeping
 * it separate from the legacy materialization lifecycle lets the public
 * adapter be shipped without publishing patch/materialization internals.
 */
function checkCompatibility(previous, candidate, diagnostics) {
    if (!isObject(previous) || !isObject(candidate)) {
        return { incomplete: false, diagnosticOverflow: false };
    }
    const oldIndex = indexForm(previous);
    const newIndex = indexForm(candidate);
    const oldLeaves = Object.create(null);
    const newLeaves = Object.create(null);
    oldIndex.elements.forEach((entry) => {
        const type = Object.prototype.hasOwnProperty.call(entry.element, 'type')
            ? entry.element.type : undefined;
        if (type !== 'Section' && type !== 'Repeatable'
            && Object.prototype.hasOwnProperty.call(entry.element, 'key')
            && typeof entry.element.key === 'string' && !oldLeaves[entry.element.key]) {
            oldLeaves[entry.element.key] = entry;
        }
    });
    newIndex.elements.forEach((entry) => {
        const type = Object.prototype.hasOwnProperty.call(entry.element, 'type')
            ? entry.element.type : undefined;
        if (type !== 'Section' && type !== 'Repeatable'
            && Object.prototype.hasOwnProperty.call(entry.element, 'key')
            && typeof entry.element.key === 'string' && !newLeaves[entry.element.key]) {
            newLeaves[entry.element.key] = entry;
        }
    });
    Object.keys(oldLeaves).sort().forEach((key) => {
        const oldType = Object.prototype.hasOwnProperty.call(oldLeaves[key].element, 'type')
            ? oldLeaves[key].element.type : 'unknown';
        const newType = newLeaves[key]
            && Object.prototype.hasOwnProperty.call(newLeaves[key].element, 'type')
            ? newLeaves[key].element.type : 'unknown';
        if (newLeaves[key] && oldType !== newType) {
            const previousType = ELEMENT_TYPES.includes(oldType) ? oldType : 'unsupported';
            const effectiveType = ELEMENT_TYPES.includes(newType) ? newType : 'unsupported';
            add(diagnostics, 'leaf-type-change', `${newLeaves[key].path}/type`, `existing leaf at ${oldLeaves[key].path} (${previousType}) cannot change to `
                + `(${effectiveType}) at ${newLeaves[key].path}`, 'use a new key for a different field type');
        }
    });
    return {
        incomplete: oldIndex.tooDeep || oldIndex.cyclic || oldIndex.tooLarge
            || newIndex.tooDeep || newIndex.cyclic || newIndex.tooLarge,
        diagnosticOverflow: oldIndex.diagnosticOverflow || newIndex.diagnosticOverflow
    };
}
module.exports = { checkCompatibility };
//# sourceMappingURL=compatibility.js.map