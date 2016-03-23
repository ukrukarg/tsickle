// This test is for verifying that accessing an object field
// by string name, e.g. foo['bar'], is disallowed by sickle
// because it breaks in the presence of Closure renaming.
let /** Fields */ x;
x['field']; // should error
let /** FieldsIndexable */ x2;
x2['field']; // is ok, object is indexable
class FieldsClass {
    static _sickle_typeAnnotationsHelper() {
        /** @type {string} */
        FieldsClass.prototype.field;
    }
}
let /** FieldsClass */ x3;
x3['field']; // should error
(
/**
 * @return {Fields}
 */
/**
 * @return {Fields}
 */
    () => null)()['field']; // should error
let /** Array<number> */ bracketTestArray;
let /** Array<number> */ bracketTestArray2;
bracketTestArray[1]; // ensure we didn't accidentally break arrays
bracketTestArray2[1];
let /** Object<string,number> */ bracketTestMap;
bracketTestMap['a']; // ensure we didn't accidentally break maps
