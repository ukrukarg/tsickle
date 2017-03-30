goog.module('test_files.blacklist.user');var module = module || {id: 'test_files/blacklist/user.js'};/**
 * Should have the questionmark type.
 */
let blacklisted = { x: '1' };
console.log(blacklisted);
/**
 * Should have an ordinary type.
 */
let otherlib = { y: '1' };
console.log(otherlib);
