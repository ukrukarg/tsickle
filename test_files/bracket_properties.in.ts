// This test is for verifying that accessing an object field
// by string name, e.g. foo['bar'], is disallowed by sickle
// because it breaks in the presence of Closure renaming.

interface Fields {
  field: string;
}
let x: Fields;
x['field'];  // should error

interface FieldsIndexable {
  field: string;
  [key: string]: string;
}
let x2: FieldsIndexable;
x2['field'];  // is ok, object is indexable

class FieldsClass {
  field: string;
}
let x3: FieldsClass;
x3['field'];  // should error  

((): Fields => null)()['field'];  // should error

let bracketTestArray: number[];
let bracketTestArray2: Array<number>;
bracketTestArray[1];  // ensure we didn't accidentally break arrays
bracketTestArray2[1];
let bracketTestMap: {[key: string]: number};
bracketTestMap['a'];  // ensure we didn't accidentally break maps
