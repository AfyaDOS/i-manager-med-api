"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareKeys = void 0;
function compareKeys(a, b) {
    return new Promise((resolve, reject) => {
        const aKeys = Object.keys(a).sort();
        const bKeys = Object.keys(b).sort();
        const missingKeys = [];
        if (aKeys.length !== bKeys.length) {
            aKeys.forEach((key, index) => {
                if (!bKeys[index]) {
                    console.log(key);
                    missingKeys.push(key);
                }
            });
            return reject(new Error('Dados não esperados.'));
        }
        if (JSON.stringify(aKeys) === JSON.stringify(bKeys)) {
            return resolve(true);
        }
        return reject(new Error('Dados não esperados.'));
    });
}
exports.compareKeys = compareKeys;
