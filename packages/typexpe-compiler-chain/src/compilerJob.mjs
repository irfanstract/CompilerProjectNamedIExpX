


import { throwTypeError, throwAssertionError, util, Deferred } from "typexpe-commons/src/common_sv.mjs";




import {
  // @ts-ignore
  TypicalPossiblyExecubleAppSrcTreeAnalysis,
} from "typexpe-compiler-fwcore/src/srcFileTree.mjs";

import TS from "typescript" ;



import { awaitify } from "../../typexpe-jscompiler/src/tsp.mjs";







/**
 * starts another async compiler run for given {@link TypicalPossiblyExecubleAppSrcTreeAnalysis }
 * 
 */
const startCompilerRunOnSrcTree = /** @satisfies {(x: TypicalPossiblyExecubleAppSrcTreeAnalysis, options?: { rfctImpl: typeof DEFAULT_RFCTBUNDLE } ) => Object } */ (...[x, { rfctImpl = DEFAULT_RFCTBUNDLE, } = {} ]) => {
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

        //
        const sfm = (
          (await util.arrayFromAsync((async function* () {
            for (const [fPath, fContents] of Object.entries(x.srcFileMap ) )
            {
              yield /** @type {const } */ ([fPath, { fullSrcContents: fContents, fullSrcText: await fContents.text(), } ]) ;
            }
          } )()))
          .map(/** @return {SrcFileInfAnalysis} */ ([srcPath, { fullSrcContents, fullSrcText, }]) => ({
            srcPath,
            fullSrcContents,
            fullSrcText ,
          }) )
        ) ;

        const {
          runChunkCompileTask ,
          runFinalCompileTask ,
        } = rfctImpl({ sfm, }) ;

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



/**
 * @typedef {{ srcPath: string, fullSrcContents: Blob, fullSrcText: string , }} SrcFileInfAnalysis
 * 
 */

import DEFAULT_RFCTBUNDLE from "./asyncifyingRcft.mjs";











