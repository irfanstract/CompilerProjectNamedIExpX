


import { throwTypeError, throwAssertionError, Deferred } from "typexpe-commons/src/common_sv.mjs";




import {
  // @ts-ignore
  TypicalSrcTreeRepr,
} from "typexpe-compiler-fwcore/src/srcFileTree.mjs";







/**
 * starts another async compiler run for given {@link TypicalSrcTreeRepr }
 * 
 */
const startCompilerRunOnSrcTree = /** @satisfies {(x: TypicalSrcTreeRepr ) => Object } */ (x) => {
  const abortpoint = new AbortController ;

  const pr = /** @satisfies {Deferred<({ finished: false, } | { finished: true, })> } */ (new Deferred) ;

  (async () => {
    ;

    const enlog = /** @satisfies {(...args: [String | Error, ...any ]) => any } */ (s, ...a) => console["log"] ((s instanceof Error) ? s : `[compiler] ${s }`, ...a ) ;

    /** */
    let finished = false ;

    try {
      ;
      R :
      {
        LOOP:
        for (const _ of "01234" ) {
          if (abortpoint.signal.aborted) {
            ;
            enlog(`receiving abort-instru ; terminating early`) ;
            break R ;
          }
          await ((t) => new Promise(resolve => setTimeout(resolve, t ) ) )(1.8 * 1000 ) ;
          enlog(`still compiling.`) ;
        }
  
        (finished = true) , enlog(`successful.`) ;
      }
  
      /** should log "terminated" even when successful */
      enlog(`terminated.`) ;
    } finally {
      pr.resolve({ finished, }) ;
    }
  } )() ;

  return /** @type {const } */ ({
    /** */
    close: () => { const r = abortpoint.abort() ; return r ; } ,

    pr ,

    srcs: x ,
  }) ;
} ;

export { startCompilerRunOnSrcTree, } ;











