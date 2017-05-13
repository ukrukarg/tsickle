goog.module('test_files.index_signature.index_signature');var module = module || {id: 'test_files/index_signature/index_signature.js'};
/**
 * @record
 */
function StringIndexInterface() { }
/**
 * @dict
 */
class StringIndexClass {
}
/**
 * @dict
 */
class StringIndexClassWithProperty {
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
function SubInterface() { }
/**
 * @record
 */
function NumberIndexInterface() { }
class NumberIndexClassWithProperty {
}
function NumberIndexClassWithProperty_tsickle_Closure_declarations() {
    /** @type {number} */
    NumberIndexClassWithProperty.prototype.property2;
}
const /** @type {!NumberIndexClassWithProperty} */ numberIndex = new NumberIndexClassWithProperty();
numberIndex[0] = 1;
numberIndex.property2 = 1;
