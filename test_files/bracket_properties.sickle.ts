Error at test_files/bracket_properties.in.ts:9:13: indexing an object is unsafe in the presence of Closure renaming
Error at test_files/bracket_properties.in.ts:22:13: indexing an object is unsafe in the presence of Closure renaming
Error at test_files/bracket_properties.in.ts:24:13: indexing an object is unsafe in the presence of Closure renaming
====
// This test is for verifying that accessing an object field
// by string name, e.g. foo['bar'], is disallowed by sickle
// because it breaks in the presence of Closure renaming.

interface Fields {
  field: string;
}
let /** @type {Fields} */ bracketTest1: Fields;
console.log(bracketTest1['field']);  // should error

interface FieldsIndexable {
  field: string;
  [key: string]: string;
}
let /** @type {FieldsIndexable} */ bracketTest2: FieldsIndexable;
console.log(bracketTest2['field']);  // is ok, object is indexable

class FieldsClass {
  field: string;

  static _sickle_typeAnnotationsHelper() {
 /** @type {string} */
    FieldsClass.prototype.field;
  }

}
let /** @type {FieldsClass} */ bracketTest3: FieldsClass;
console.log(bracketTest3['field']);  // should error

console.log((
/**
 * @return {Fields}
 */
(): Fields => null)()['field']);  // should error

let /** @type {Array<number>} */ bracketTestArray: number[];
let /** @type {Array<number>} */ bracketTestArray2: Array<number>;
console.log(bracketTestArray[1]);  // ensure we didn't accidentally break arrays
console.log(bracketTestArray2[1]);
let /** @type {Object<string,number>} */ bracketTestMap: {[key: string]: number};
console.log(bracketTestMap['a']);  // ensure we didn't accidentally break maps
