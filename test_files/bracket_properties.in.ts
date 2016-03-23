// This test is for verifying that accessing an object field
// by string name, e.g. foo['bar'], is disallowed by sickle
// because it breaks in the presence of Closure renaming.

interface Fields {
  field: string;
}
let bracketTest1: Fields;
console.log(bracketTest1['field']);  // should error

interface FieldsIndexable {
  field: string;
  [key: string]: string;
}
let bracketTest2: FieldsIndexable;
console.log(bracketTest2['field']);  // is ok, object is indexable

class FieldsClass {
  field: string;
}
let bracketTest3: FieldsClass;
console.log(bracketTest3['field']);  // should error

console.log(((): Fields => null)()['field']);  // should error

let bracketTestArray: number[];
let bracketTestArray2: Array<number>;
console.log(bracketTestArray[1]);  // ensure we didn't accidentally break arrays
console.log(bracketTestArray2[1]);
let bracketTestMap: {[key: string]: number};
console.log(bracketTestMap['a']);  // ensure we didn't accidentally break maps
