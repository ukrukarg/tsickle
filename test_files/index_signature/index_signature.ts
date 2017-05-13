export {};

// Strings

interface StringIndexInterface {
  [k: string]: number;
}
class StringIndexClass {
  [k: string]: number;
}
class StringIndexClassWithProperty {
  [k: string]: number;
  property: number;
}

const mixedInstance = new StringIndexClassWithProperty();
mixedInstance['x'] = 1;
// mixedInstance.property = 2; accessing would give an error in Closure Compiler.

interface SubInterface extends StringIndexInterface {}

// Numbers

interface NumberIndexInterface {
  [k: number]: number;
}
class NumberIndexClassWithProperty {
  [k: number]: number;
  property2: number;
}
const numberIndex = new NumberIndexClassWithProperty();
numberIndex[0] = 1;
numberIndex.property2 = 1;
