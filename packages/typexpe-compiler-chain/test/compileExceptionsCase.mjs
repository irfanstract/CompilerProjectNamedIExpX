

import assert from "assert";
import { TypeError } from "typexpe-compiler-fwcore/src/compileExceptions.mjs";





describe("compile-exceptions", () => {
  ;

  it(`the imported ${TypeError.name } is what we're talking about`, () => {
    assert(TypeError !== globalThis.TypeError ) ;
  } ) ;
  
  it(`should successfully instantiate ${TypeError.name }`, () => {
    const e = new TypeError(`Type Mismatch; at L132@<repl>`) ;
    assert(e instanceof TypeError ) ;
    console["log"](e) ;
  } ) ;
  
  it(`should successfully instantiate and throw ${TypeError.name }`, () => {
    const e = new TypeError(`Type Mismatch; at L135@<repl>`) ;
    assert.throws(() => { throw e ; } ) ;
  } ) ;

} ) ;




