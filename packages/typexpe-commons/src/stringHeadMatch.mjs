







/**
 * expects that
 * the given {@link RegExp} `x1` (expected to be non-`global`) matches the {@link String string} `x`'s head
 * 
 * will return {@link expcHeaNegative} on negative ;
 * if positive, will return a struct describing all the analyses
 * 
 * the returned struct:
 * - `matchedString` and `remainder`
 * - mirroring the original arguments, `originalTriedForSpec` and `originalString`
 * 
 */
const expectHead = /** @satisfies {(x: String, x1: RegExp ) => Object } */ (...[x, mainSpec]) => {
  const { m1: mainMatch, } = { m1: (
    x.match((
      checkRegexBeingNonGlobal(mainSpec) ,
      RegExp("^" + mainSpec.source, mainSpec.flags )
    ) )
  ) } ;
  if (mainMatch) 
  {
    {
      ;
      const matchedString = mainMatch[0] ;
      ;
      return {
        matchedString ,
        remainder: x.slice(matchedString.length ) ,
        originalTriedForSpec: mainSpec ,
        originalString: x,
      } ;
    }
  }
  return expcHeaNegative ;
} ;

/** {@link expectHead} */
const expcHeaNegative = false ;

export { expectHead, } ;




/**
 * checks that the RegExp's `global` return `false`.
 * 
 */
const checkRegexBeingNonGlobal = /** @type {(x: RegExp) => asserts x is { global: false, } } */ (x1) => {
  ;
  if (x1.global) {
    throw new TypeError(`cannot use global-mode RegExp(s) (was: ${x1 } ).`) ;
  }
} ;

export { checkRegexBeingNonGlobal } ;




/**
 * *a RegExp which always yield negative*.
 * 
 * for example,
 * {@link expectFromHead } resolves `false` being passed in place of RegExp,
 * to this
 * 
 */
const defaultAlwaysNegativeRegExp = (
  /(?!())/
) ;







