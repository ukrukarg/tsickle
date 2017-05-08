/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

namespace ns.one {
export class NamespacedClass {
    x: NamespacedClass;
    y: ns.two.NamespacedClass;
  }

function NamespacedClass_tsickle_Closure_declarations() {
/** @type {!ns.one.NamespacedClass} */
NamespacedClass.prototype.x;
/** @type {!ns.two.NamespacedClass} */
NamespacedClass.prototype.y;
}

}

namespace ns.two {
export class NamespacedClass {
    x: ns.one.NamespacedClass;
    y: NamespacedClass;
  }

function NamespacedClass_tsickle_Closure_declarations() {
/** @type {!ns.one.NamespacedClass} */
NamespacedClass.prototype.x;
/** @type {!ns.two.NamespacedClass} */
NamespacedClass.prototype.y;
}

}
