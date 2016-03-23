Error at test_files/type.in.ts:6:19: IndexSignature not implemented in type literal member
====
let /** ? */ typeAny: any;
let /** Array<?> */ typeArr: Array<any>;
let /** Array<?> */ typeArr2: any[];
let /** Array<Array<{a: ?}>> */ typeNestedArr: {a:any}[][];
let /** {a: number, b: string} */ typeObject: {a:number, b:string};
let /** {} */ typeObject2: {[key:string]: number};
