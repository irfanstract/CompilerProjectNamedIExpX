




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
 * exports both {@link resolve} and {@link reject}.
 * 
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

/**
 * Array from async-generator
 */
export const arrayFromAsync = /** @template E @param {AsyncIterable<E> } x */ async (x) => {
  /** @type {readonly E[] } */ let v = [] ;
  for await (const e of x) {
    v = [...v, e ]
  }
  return v ;
} ;

/**
 * Array from async-generator-function
 */
export const arrayFromAsyncFac = /** @template E @param {() => AsyncIterable<E> } x */ (x) => arrayFromAsync(x() ) ;

/**
 * re-iterable
 */
export const reiterable = /** @template E @param {() => Generator<E> } x @return {Iterable<E> } */ (x) => {
  return {
    [Symbol.iterator]: x ,
  } ;
} ;
/**
 * re-iterable
 */
export const asyncReiterable = /** @template E @param {() => AsyncGenerator<E> } x @return {AsyncIterable<E> } */ (x) => {
  return {
    [Symbol.asyncIterator]: x ,
  } ;
} ;

/**
 * build string by concatenating, with CRLF, lines from `x`.
 * 
 */
export const stringLinesConcatAsync = /** @template {String} E @param {() => AsyncGenerator<E> } x */ async (x) => (
  (await arrayFromAsync(x() ) )
  .join("\r\n")
) ;
/**
 * build string by concatenating, with CRLF, lines from `x`.
 * 
 */
export const stringLinesConcat = /** @template {String} E @param {() => Generator<E> } x */ (x) => (
  [...reiterable(x) ]
  .join("\r\n")
) ;







