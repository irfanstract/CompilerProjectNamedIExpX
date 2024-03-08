


import { throwTypeError, throwAssertionError, Deferred } from "typexpe-commons/src/common_sv.mjs";




import {
  // @ts-ignore
  TypicalSrcTreeRepr,
} from "typexpe-compiler-fwcore/src/srcFileTree.mjs";

import TS from "typescript" ;



import { awaitify } from "../../typexpe-jscompiler/src/tsp.mjs";







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
        ;

        const runChunkCompileTask = () => {} ;

        const runFinalCompileTask = () => {
          ;
          const sfm = (
            Object.entries(x.srcFileMap )
            .map(([srcPath, fullSrcText]) => ({
              srcPath, fullSrcText ,
            }) )
          ) ;
          const allCompiles = (
            sfm
            .map(opt => {
              const { fullSrcText, srcPath, } = opt ;

              //
              const objCode = awaitify(fullSrcText ) ;
              console["log"]({ srcPath, fullSrcText, objCode, } ) ;
              const objCodeEvaluatedUnappliedPr = (
                (async () => {
                  try {
                    ;
                    return /** @type {() => ((...args: [] ) => Promise<any> ) } */ (
                      Function(`return (async () => { ${(objCode) } ; } ) ;`)
                    ) ;
                  } catch (e) { return throwTypeError(`malformed bytecode: ${e }`, e ) ; }
                } )()
                .then(fnc => {
                  try {
                    return fnc() ;
                  } catch (e) {
                    return throwTypeError(`exception while extracting the described Function: ${e }`, e ) ;
                  }
                } )
              ) ;

              return ({
                ... /** @satisfies {{ [k in keyof typeof opt]: any } } */ ({
                  fullSrcText ,
                  srcPath ,
                }) ,
                ... {
                  //
                  opt ,
                  objCode ,
                  objCodeEvaluatedUnappliedPr ,
                }
              }) ;
            })
          ) ;
          for (const { fullSrcText, srcPath, objCode, objCodeEvaluatedUnappliedPr, } of allCompiles )
          {
            const objCodeEvaluatedUnappliedPr1 = (
              objCodeEvaluatedUnappliedPr
              .catch(z => {
                (console["error"](`malformed bytecode ; closing the enclosing session. \n please report to our devs!`), 0 ? (console["info"](z) , setTimeout(() => throwTypeError(`exiting`, z), 0.3 * 1000 ) ) : (void 0, console["error"](z) ) ) ;
                // throw new TypeError(`exec failed: ${z } `, z ) ;
              } )
            ) ;
            (
              objCodeEvaluatedUnappliedPr1
              .then(fnc => fnc?.() )
              .catch(r => (console["info"](`exception in code run`), console["info"](r) ) )
              .then(c => (console["info"](`done with value:`, c) , setImmediate(() => process.exit(0) ) ) )
            ) ;
          }
        } ;

        {
          LOOP:
          for (const _ of "01" ) {
            if (abortpoint.signal.aborted) {
              ;
              enlog(`receiving abort-instru ; terminating early`) ;
              break R ;
            }
            await ((t) => new Promise(resolve => setTimeout(resolve, t ) ) )(1.8 * 1000 ) ;
            enlog(`still compiling.`) ;
            runChunkCompileTask() ;
          }

          runFinalCompileTask() ;
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











