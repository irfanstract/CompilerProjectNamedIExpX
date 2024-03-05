




import assert from "assert";

export { assert } ;

export const throwTypeError = /** @satisfies {(...a: ConstructorParameters<typeof Error> ) => never } */ (...a) => { throw new TypeError(...a) ; } ;

export const throwAssertionError = /** @satisfies {(...a: ConstructorParameters<typeof Error> ) => never } */ (...a) => { throw new Error(...a) ; } ;



const iterateNonNull = /** @type {<const A>(x: A) => ([A & {}] | []) } */ (x) => (
  isNonNull(x) ?
  [x] : []
) ;

const isNonNull = /** @type {<const A>(x: A) => x is (A & {})} */ (x) => (
  (x ?? null) === null
) ;

export { iterateNonNull, isNonNull, } ;




/**
 * @class
 * @template {{}} A
 */
function Deferred()
{
  this.out = (new Promise(/** @param {(x: A) => void } resolve */ (resolve, reject) => {
    this.resolve = resolve ;
    this.reject = reject ;
  }) ) ;

  /** @type {(x: A) => void } */
  this.resolve ;
}

export { Deferred, } ;







