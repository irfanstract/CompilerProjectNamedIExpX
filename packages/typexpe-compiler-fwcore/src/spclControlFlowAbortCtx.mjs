

import { throwTypeError, throwAssertionError, util, } from "typexpe-commons/src/common_sv.mjs";








/**
 * allocate fresh {@link AbortController },
 * and
 * apply these definitions
 * 
 */
const newAbortPointCtx = function ()
{

  const abortpoint = new AbortController ;

  return expandAbortSignalObjAsCtx(abortpoint) ;
} ;

/**
 * given a {@link AbortController },
 * apply these definitions
 * 
 */
const expandAbortSignalObjAsCtx = /** @param {AbortController} abortpoint */ function (abortpoint)
{

  const abortSig = abortpoint.signal ;

  /**
   * to resolve if {@link abortpoint} gets `abort`-ed.
   * 
   */
  const CANCELLED = (
    new Promise(/** @type {(...args: [(r: Event) => void ] ) => void } */ (r) => {
      abortSig.addEventListener("abort", r ) ;
    } )
  ) ;

  /**
   * a {@link Promise }, to
   * never resolve unless
   * {@link abortpoint} {@link AbortController.abort has been `abort`-ed} thereby {@link Promise.catch to be taken as failure }
   * .
   * 
   */
  const NEVER_UNLESS_CANCELLED = (
    CANCELLED
    .then(e => { return throwTypeError("aborted") ; } )
  ) ;

  return {
    abortpoint ,
    abortSig ,
    CANCELLED ,
    NEVER_UNLESS_CANCELLED ,
  } ;
} ;

export {
  newAbortPointCtx,
  expandAbortSignalObjAsCtx,
} ;








