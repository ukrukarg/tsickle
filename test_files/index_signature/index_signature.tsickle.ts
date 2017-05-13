export {};
/**
 * @record
 */
function StringIndexInterface() {}


// Strings

interface StringIndexInterface {
  [k: string]: number;
}
/**
 * @dict
 */
class StringIndexClass {
  [k: string]: number;
}
/**
 * @dict
 */
class StringIndexClassWithProperty {
  [k: string]: number;
  property: number;
}

function StringIndexClassWithProperty_tsickle_Closure_declarations() {
/** @type {number} */
StringIndexClassWithProperty.prototype.property;
}


const /** @type {!StringIndexClassWithProperty} */ mixedInstance = new StringIndexClassWithProperty();
mixedInstance['x'] = 1;
/**
 * @record
 * @extends {StringIndexInterface}
 */
function SubInterface() {}

// mixedInstance.property = 2; accessing would give an error in Closure Compiler.

interface SubInterface extends StringIndexInterface {}
/**
 * @record
 */
function NumberIndexInterface() {}


// Numbers

interface NumberIndexInterface {
  [k: number]: number;
}
class NumberIndexClassWithProperty {
  [k: number]: number;
  property2: number;
}

function NumberIndexClassWithProperty_tsickle_Closure_declarations() {
/** @type {number} */
NumberIndexClassWithProperty.prototype.property2;
}

const /** @type {!NumberIndexClassWithProperty} */ numberIndex = new NumberIndexClassWithProperty();
numberIndex[0] = 1;
numberIndex.property2 = 1;
