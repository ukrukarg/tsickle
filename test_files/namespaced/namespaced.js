goog.module('test_files.namespaced.namespaced');var module = module || {id: 'test_files/namespaced/namespaced.js'};/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ns;
(function (ns) {
    var one;
    (function (one) {
        class NamespacedClass {
        }
        one.NamespacedClass = NamespacedClass;
        function NamespacedClass_tsickle_Closure_declarations() {
            /** @type {!ns.one.NamespacedClass} */
            NamespacedClass.prototype.x;
            /** @type {!ns.two.NamespacedClass} */
            NamespacedClass.prototype.y;
        }
    })(one = ns.one || (ns.one = {}));
})(ns || (ns = {}));
(function (ns) {
    var two;
    (function (two) {
        class NamespacedClass {
        }
        two.NamespacedClass = NamespacedClass;
        function NamespacedClass_tsickle_Closure_declarations() {
            /** @type {!ns.one.NamespacedClass} */
            NamespacedClass.prototype.x;
            /** @type {!ns.two.NamespacedClass} */
            NamespacedClass.prototype.y;
        }
    })(two = ns.two || (ns.two = {}));
})(ns || (ns = {}));
