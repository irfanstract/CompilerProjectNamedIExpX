


import { throwTypeError, throwAssertionError, util, Deferred } from "typexpe-commons/src/common_sv.mjs";



import {
  newAbortPointCtx,
  expandAbortSignalObjAsCtx,
} from "typexpe-compiler-fwcore/src/spclControlFlowAbortCtx.mjs";

import {
  TypicalPossiblyExecubleAppSrcTreeAnalysis,
  XAppUrl,
} from "typexpe-compiler-fwcore/src/srcFileTree.mjs";







/**
 * starts another async compiler run for given {@link TypicalPossiblyExecubleAppSrcTreeAnalysis }
 * 
 */
const startCompilerRunOnSrcTree = /** @satisfies {(x: TypicalPossiblyExecubleAppSrcTreeAnalysis, options?: { rfctImpl: RfctImpl } ) => Object } */ (...[x, { rfctImpl = DEFAULT_RFCTBUNDLE, } = {} ]) => {
  ;

  const {
    abortpoint,
    CANCELLED ,
    NEVER_UNLESS_CANCELLED ,
  } = newAbortPointCtx() ;

  const pr = /** @satisfies {Deferred<({ finished: false, } | { finished: true, })> } */ (new Deferred) ;
  
  const srcCplxAnalyticTask = (
    startSrcCplxAnalyticTask(x, { abortpoint, rfctImpl, } )
  ) ;

  (async () => {
    ;

    //
    const { enlog, } = await srcCplxAnalyticTask ;

    try {
      /** */
      let finished = false ;
  
      try {
        ;
        R :
        {
          ;
          
          //
          const { srcsDecoded, } = await srcCplxAnalyticTask ;

          const {
            runChunkCompileTask ,
            runFinalCompileTask ,
          } = rfctImpl({ sfm: srcsDecoded, }) ;
  
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
    
      } finally {
        pr.resolve({ finished, }) ;
      }
    }
    finally {
      ;
      
      /** by design we shall log "terminated" even when successful */
      enlog(`terminated.`) ;
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

import { SrcFileInfDecodeAnalysis, } from "typexpe-compiler-fwcore/src/srcFileTreePreload.mjs";
export { SrcFileInfDecodeAnalysis, } ;

import {
  ChunkCallableCompileTask,
  ChunkCallableCompiledLang ,
} from "typexpe-compiler-fwcore/src/compilerThreads.mjs";

/**
 * @typedef {ChunkCallableCompiledLang } RfctImpl
 * 
 */

// export { ChunkCallableCompileTask, } ;

/** @satisfies {(x: TypicalPossiblyExecubleAppSrcTreeAnalysis, options: { abortpoint: AbortController , rfctImpl: RfctImpl } ) => Object } */
const startSrcCplxAnalyticTask = function (...[x, { abortpoint, rfctImpl, } ])
{
  return (
    (async () => {
      ;
      
      const enlog = /** @satisfies {(...args: [String | Error, ...any ]) => any } */ (s, ...a) => console["log"] ((s instanceof Error) ? s : `[compiler] ${s }`, ...a ) ;

      const {
        NEVER_UNLESS_CANCELLED,
      } = expandAbortSignalObjAsCtx(abortpoint) ;

      /**
       * read-and-decode all the files' contents (ie decode eg UTF-8)
       * 
       */
      const srcsDecoded = (
        (await util.arrayFromAsync((async function* () {
          for (const [fPath, fContents] of Object.entries(x.srcFileMap ) )
          {
            const fullSrcText = await Promise.race([NEVER_UNLESS_CANCELLED, fContents.text() ]) ;

            yield /** @type {const } */ ([fPath, { fullSrcContents: fContents, fullSrcText: fullSrcText, } ]) ;
          }
        } )()))
        .map(/** @return {SrcFileInfDecodeAnalysis} */ ([srcPath, { fullSrcContents, fullSrcText, }]) => ({
          srcPath,
          fullSrcContents,
          fullSrcText ,
        }) )
      ) ;

      return {
        //
        enlog ,
        srcsDecoded: (
          srcsDecoded
        ) ,
      } ;
    } )()
  ) ;
} ;




import DEFAULT_RFCTBUNDLE from "./asyncifyingRcft.mjs";











