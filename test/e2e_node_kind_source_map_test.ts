/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// tslint:disable:no-unused-expression mocha .to.be.empty getters.

import {expect} from 'chai';
import * as path from 'path';
import * as ts from 'typescript';

import * as tsickle from '../src/tsickle';

import {compile, getLineAndColumn} from './test_support';

describe('source maps each node with transformer', () => {
  // TODO(lucassloan): enable when we have a custom transformer for classes
  // it('maps both parts of the class declaration to the original code', () => {
  //   const sources = new Map<string, string>();
  //   sources.set('input.ts', `class X {
  //     field: number = 3;
  //     foo(x: number) {
  //       return x + 1;
  //     }
  //   }`);


  //   // Run tsickle+TSC to convert inputs to Closure JS files.
  //   const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'X.prototype.field;');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(2, 'field definition');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '/** @type {number} */');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(2, 'field type annotation');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'this.field = 3;');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(2, 'field value set');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'X_tsickle_Closure_declarations');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'closure declaration');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   // TODO(lucassloan): waiting on https://github.com/Microsoft/TypeScript/issues/17576
  //   // so we can source map jsdoc comments
  //   // {
  //   //   const {line, column} = getLineAndColumn(compiledJS, '@param {number} x');
  //   //   expect(sourceMap.originalPositionFor({line, column}).line)
  //   //       .to.equal(3, 'method parameter type annotation');
  //   //   expect(sourceMap.originalPositionFor({line, column}).source)
  //   //       .to.equal('input.ts', 'input file name');
  //   // }
  //   // {
  //   //   const {line, column} = getLineAndColumn(compiledJS, '@return {number}');
  //   //   expect(sourceMap.originalPositionFor({line, column}).line)
  //   //       .to.equal(3, 'method return type annotation');
  //   //   expect(sourceMap.originalPositionFor({line, column}).source)
  //   //       .to.equal('input.ts', 'input file name');
  //   // }
  // });

  it('maps import declarations correctly', () => {
    const sources = new Map<string, string>();
    sources.set('input.ts', `import * as ts from 'typescript';
      import {join, format as fmt} from 'path';
      ts.ModuleKind.CommonJS;
      join;
      fmt;`);

    // Run tsickle+TSC to convert inputs to Closure JS files.
    const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

    {
      const {line, column} = getLineAndColumn(compiledJS, `var ts`);
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'typescript require');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, `goog.require('typescript')`);
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'typescript require');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, `var path_1`);
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(2, 'path require');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, `goog.require('path')`);
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(2, 'path require');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
  });

  it('maps export declarations correctly', () => {
    const sources = new Map<string, string>();
    sources.set('input.ts', `export const x = 4;
      const y = 'stringy';
      export {y};
      export {format as fmt} from "path";`);

    // Run tsickle+TSC to convert inputs to Closure JS files.
    const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

    {
      const {line, column} = getLineAndColumn(compiledJS, 'exports.x = 4;');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'x export');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, 'exports.y = y;');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(3, 'y export');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, 'exports.fmt');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(4, 'fmt export');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, 'path_1.format');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(4, 'fmt export');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
  });

  // TODO(lucassloan): enable when we have a custom transformer for interfaces
  // it('maps interface declarations correctly', () => {
  //   const sources = new Map<string, string>();
  //   sources.set('input.ts', `interface Foo {
  //       color: string;
  //       width?: number;
  //       [propName: string]: any;
  //     }`);

  //   // Run tsickle+TSC to convert inputs to Closure JS files.
  //   const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '@record');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'class definition');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'Foo_tsickle_Closure_declarations()');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'closure
  //     declaration'); expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '/** @type {string} */');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(2, 'color type annotation');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'Foo.prototype.color;');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(2, 'color field declaration');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '/** @type {number} */');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(3, 'width type annotation');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  // });

  it('maps variable declarations', () => {
    const sources = new Map<string, string>();
    sources.set('input.ts', `let x : string = 'a string';`);

    // Run tsickle+TSC to convert inputs to Closure JS files.
    const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

    {
      const {line, column} = getLineAndColumn(compiledJS, '/** @type {string} */');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'type annotation');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, 'var /** @type {string} */');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'var keyword');
      expect(sourceMap.originalPositionFor({line, column}).column).to.equal(0, 'var keyword');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
  });

  // TODO(lucassloan): enable when we have a custom transformer for classes
  // it('maps constructors', () => {
  //   const sources = new Map<string, string>();
  //   sources.set('input.ts', `class X {
  //     constructor(private x: number, public y: string) {}
  //   }`);

  //   // Run tsickle+TSC to convert inputs to Closure JS files.
  //   const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '/** @type {number} */');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(2, 'field type annotation');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'X.prototype.x;');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(2, 'field
  //     declaration'); expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   // TODO(lucassloan): waiting on https://github.com/Microsoft/TypeScript/issues/17576
  //   // so we can source map jsdoc comments
  //   // {
  //   //   const {line, column} = getLineAndColumn(compiledJS, '@param {number} x');
  //   //   expect(sourceMap.originalPositionFor({line, column}).line)
  //   //       .to.equal(2, 'field declaration');
  //   //   expect(sourceMap.originalPositionFor({line, column}).source)
  //   //       .to.equal('input.ts', 'input file name');
  //   // }
  // });

  // TODO(lucassloan): enable when we have a custom transformer for functions
  // it('maps function definitions', () => {
  //   const sources = new Map<string, string>();
  //   sources.set('input.ts', `function incr(n: number): number {
  //       return n + 1;
  //     }`);

  //   // Run tsickle+TSC to convert inputs to Closure JS files.
  //   const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '@param {number} n');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(1, 'constructor');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '@return {number}');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(1, 'constructor');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  // });

  // TODO(lucassloan): enable when we have a custom transformer for type aliases
  // it('maps type alias declarations', () => {
  //   const sources = new Map<string, string>();
  //   sources.set('input.ts', `type foo = string;`);

  //   // Run tsickle+TSC to convert inputs to Closure JS files.
  //   const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '/** @typedef {string} */');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'typedef');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'var foo;');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'type var');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  // });

  // TODO(lucassloan): enable when we have a custom transformer for enums
  // it('maps enum declarations', () => {
  //   const sources = new Map<string, string>();
  //   sources.set('input.ts', `enum Direction {
  //       Up = 1,
  //       Down,
  //       Left,
  //       Right
  //     }`);

  //   // Run tsickle+TSC to convert inputs to Closure JS files.
  //   const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '/** @enum {number} */');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(1, 'enum type annotation');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'var Direction');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'enum declaration');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'Up: 1,');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(2, 'enum option definition');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, 'Direction[Direction.Up] = "Up";');
  //     expect(sourceMap.originalPositionFor({line, column}).line)
  //         .to.equal(2, 'enum option name declaration');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  // });

  // TODO(lucassloan): enable when we have a custom transformer for enums
  // it('maps template spans', () => {
  //   const sources = new Map<string, string>();
  //   sources.set('input.ts', '`text text text\n${1 + 1}\n${null as string}`');

  //   // Run tsickle+TSC to convert inputs to Closure JS files.
  //   const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

  //   {
  //     const {line, column} = getLineAndColumn(compiledJS, '/** @type {string} */');
  //     expect(sourceMap.originalPositionFor({line, column}).line).to.equal(3, 'type annotation');
  //     expect(sourceMap.originalPositionFor({line, column}).source)
  //         .to.equal('input.ts', 'input file name');
  //   }
  // });

  it('maps type assertions', () => {
    const sources = new Map<string, string>();
    sources.set('input.ts', `const x = undefined as string;
      const y = <number>undefined;`);

    // Run tsickle+TSC to convert inputs to Closure JS files.
    const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

    {
      const {line, column} = getLineAndColumn(compiledJS, '/** @type {string} */');
      expect(sourceMap.originalPositionFor({line, column}).line)
          .to.equal(1, 'string type annotation');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, '(undefined)');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'bracketed undefined');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, '/** @type {number} */');
      expect(sourceMap.originalPositionFor({line, column}).line)
          .to.equal(2, 'number type annotation');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
  });

  it('maps non null expression', () => {
    const sources = new Map<string, string>();
    sources.set('input.ts', `let x: string = undefined!;`);

    // Run tsickle+TSC to convert inputs to Closure JS files.
    const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

    {
      const {line, column} = getLineAndColumn(compiledJS, '/** @type {string} */');
      expect(sourceMap.originalPositionFor({line, column}).line)
          .to.equal(1, 'string type annotation');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, '((undefined))');
      expect(sourceMap.originalPositionFor({line, column}).line).to.equal(1, 'bracketed undefined');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
  });

  it('maps element access', () => {
    const sources = new Map<string, string>();
    sources.set('input.ts', `class X {
        [propName: string]: any;
      }

      const x = new X();
      x.foo;`);

    // Run tsickle+TSC to convert inputs to Closure JS files.
    const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

    {
      const {line, column} = getLineAndColumn(compiledJS, 'x["foo"];');
      expect(sourceMap.originalPositionFor({line, column}).line)
          .to.equal(6, 'rewritten element access');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
  });

  it('maps decorators', () => {
    const sources = new Map<string, string>();
    sources.set('input.ts', `
        /** @Annotation */
        function classAnnotation(t: any) {
            return t;
        }

        @classAnnotation({
            x: 'thingy',
        })
        class DecoratorTest1 {
            y: string;
        }`);

    // Run tsickle+TSC to convert inputs to Closure JS files.
    const {compiledJS, sourceMap} = compile(sources, {useTransformer: true});

    {
      const {line, column} = getLineAndColumn(compiledJS, 'classAnnotation, args');
      expect(sourceMap.originalPositionFor({line, column}).line)
          .to.equal(7, 'individual decorator type');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }
    {
      const {line, column} = getLineAndColumn(compiledJS, `x: 'thingy'`);
      expect(sourceMap.originalPositionFor({line, column}).line)
          .to.equal(8, 'individual decorator args');
      expect(sourceMap.originalPositionFor({line, column}).source)
          .to.equal('input.ts', 'input file name');
    }

    // TODO(lucassloan): enable when we have a custom transformer for decorators
    // {
    //   const {line, column} = getLineAndColumn(compiledJS, 'DecoratorTest1.decorators');
    //   expect(sourceMap.originalPositionFor({line, column}).line)
    //       .to.equal(7, 'decorator declaration');
    //   expect(sourceMap.originalPositionFor({line, column}).source)
    //       .to.equal('input.ts', 'input file name');
    // }
    // {
    //   const {line, column} = getLineAndColumn(
    //       compiledJS, 'DecoratorTest1.ctorParameters = function () { return []; };');
    //   expect(sourceMap.originalPositionFor({line, column}).line)
    //       .to.equal(7, 'constructor decorator declaration');
    //   expect(sourceMap.originalPositionFor({line, column}).source)
    //       .to.equal('input.ts', 'input file name');
    // }
    // {
    //   const {line, column} = getLineAndColumn(compiledJS, 'DecoratorTest1.decorators;');
    //   expect(sourceMap.originalPositionFor({line, column}).line)
    //       .to.equal(7, 'decorator type annotation');
    //   expect(sourceMap.originalPositionFor({line, column}).source)
    //       .to.equal('input.ts', 'input file name');
    // }
    // {
    //   const {line, column} = getLineAndColumn(compiledJS, 'DecoratorTest1.prototype.y;');
    //   expect(sourceMap.originalPositionFor({line, column}).line)
    //       .to.equal(11, 'normal field type annotation');
    //   expect(sourceMap.originalPositionFor({line, column}).source)
    //       .to.equal('input.ts', 'input file name');
    // }
    // TODO(lucassloan): waiting on https://github.com/Microsoft/TypeScript/issues/17576
    // so we can source map jsdoc comments
    // {
    //   const {line, column} = getLineAndColumn(compiledJS, '@param {?} t');
    //   expect(sourceMap.originalPositionFor({line, column}).line)
    //       .to.equal(3, 'annotation parameter type annotation');
    //   expect(sourceMap.originalPositionFor({line, column}).source)
    //       .to.equal('input.ts', 'input file name');
    // }
  });
});