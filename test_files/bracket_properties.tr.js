// This test is for verifying that accessing an object field
// by string name, e.g. foo['bar'], is disallowed by sickle
// because it breaks in the presence of Closure renaming.
let /** Fields */ bracketTest1;
console.log(bracketTest1['field']); // should error
let /** FieldsIndexable */ bracketTest2;
console.log(bracketTest2['field']); // is ok, object is indexable
class FieldsClass {
    static _sickle_typeAnnotationsHelper() {
        /** @type {string} */
        FieldsClass.prototype.field;
    }
}
let /** FieldsClass */ bracketTest3;
console.log(bracketTest3['field']); // should error
console.log((
/**
 * @return {Fields}
 */
/**
 * @return {Fields}
 */
    () => null)()['field']); // should error
let /** Array<number> */ bracketTestArray;
let /** Array<number> */ bracketTestArray2;
console.log(bracketTestArray[1]); // ensure we didn't accidentally break arrays
console.log(bracketTestArray2[1]);
let /** Object<string,number> */ bracketTestMap;
console.log(bracketTestMap['a']); // ensure we didn't accidentally break maps
