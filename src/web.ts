import * as ts from 'typescript';
import * as tsickle from './tsickle';

(ts as any).sys = {};

const lib = require('raw!typescript/lib/lib.d.ts');

const inputFileName = 'input.d.ts';
const libFileName = 'lib.d.ts';
const compilerOptions: ts.CompilerOptions = {
};

function createCompilerHost(input: string): ts.CompilerHost {
  let host = ts.createCompilerHost(compilerOptions, true);
  function getSourceFile(fileName: string, languageVersion: ts.ScriptTarget,
                         onError?: (message: string) => void): ts.SourceFile {
                           if (fileName === inputFileName) {
                             return ts.createSourceFile(fileName, input, languageVersion);
                           } else if (fileName === libFileName) {
                             return ts.createSourceFile(fileName, lib, languageVersion);
                           }
                           console.error(`source ${fileName}`);
                           throw new Error(`source ${fileName}`);
                         }

  return {
    fileExists(fileName: string): boolean { throw new Error('fileExists'); },
    readFile(fileName: string): string { throw new Error('readFile'); },

    getSourceFile,
    getDefaultLibFileName(options: ts.CompilerOptions): string { return 'lib.d.ts'; },
    writeFile(fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void, sourceFiles?: ts.SourceFile[]): void {
      throw new Error('writeFile');
    },
    getCurrentDirectory(): string { return '/'; },
    getDirectories(path: string): string[] { throw new Error('getDirectories'); },
    getCanonicalFileName(fileName: string): string { return fileName; },
    useCaseSensitiveFileNames(): boolean { return false; },
    getNewLine(): string { return '\n'; },
  };
}

function main() {
  let input = 'declare let x;';

  let host = createCompilerHost(input);
  let program = ts.createProgram([inputFileName], compilerOptions, host);
  {
    let diagnostics = ts.getPreEmitDiagnostics(program);
    if (diagnostics.length > 0) {
      console.error(diagnostics);
      return null;
    }
  }

  let tsickleWarnings: string[] = [];
  const tsickleOptions: tsickle.Options = {
    logWarning: warning => { tsickleWarnings.push(warning.toString()); },
  };
  let {externs, diagnostics} = tsickle.annotate(program, program.getSourceFile(inputFileName), tsickleOptions);
  if (diagnostics.length > 0) {
    console.error(diagnostics);
    return null;
  }
  console.log('externs', externs);
}

main();
