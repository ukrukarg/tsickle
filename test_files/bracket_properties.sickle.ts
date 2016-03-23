Error at test_files/bracket_properties.in.ts:9:1: indexing an object is unsafe in the presence of Closure renaming
Error at test_files/bracket_properties.in.ts:22:1: indexing an object is unsafe in the presence of Closure renaming
Error at test_files/bracket_properties.in.ts:24:1: indexing an object is unsafe in the presence of Closure renaming
Error at test_files/bracket_properties.in.ts:30:22: IndexSignature not implemented in type literal member
====
// This test is for verifying that accessing an object field
// by string name, e.g. foo['bar'], is disallowed by sickle
// because it breaks in the presence of Closure renaming.

interface Fields {
  field: string;
}
let /** Fields */ x: Fields;
x['field'];  // should error

interface FieldsIndexable {
  field: string;
  [key: string]: string;
}
let /** FieldsIndexable */ x2: FieldsIndexable;
x2['field'];  // is ok, object is indexable

class FieldsClass {
  field: string;

  static _sickle_typeAnnotationsHelper() {
 /** @type {string} */
    FieldsClass.prototype.field;
  }

}
let /** FieldsClass */ x3: FieldsClass;
x3['field'];  // should error

(
/**
 * @return {Fields}
 */
(): Fields => null)()['field'];  // should error

let /** Array<number> */ bracketTestArray: number[];
let /** Array<number> */ bracketTestArray2: Array<number>;
bracketTestArray[1];  // ensure we didn't accidentally break arrays
bracketTestArray2[1];
let /** {} */ bracketTestMap: {[key: string]: number};
bracketTestMap['a'];  // ensure we didn't accidentally break maps
