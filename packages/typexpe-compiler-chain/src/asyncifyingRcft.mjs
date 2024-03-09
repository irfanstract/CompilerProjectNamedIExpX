


import { throwTypeError, throwAssertionError, util, Deferred } from "typexpe-commons/src/common_sv.mjs";




import {
  // @ts-ignore
  TypicalPossiblyExecubleAppSrcTreeAnalysis,
} from "typexpe-compiler-fwcore/src/srcFileTree.mjs";

import TS from "typescript" ;



import { awaitify } from "../../typexpe-jscompiler/src/tsp.mjs";









/**
 * @typedef {import("./compilerJob.mjs").SrcFileInfAnalysis } SrcFileInfAnalysis
 * 
 */

/**
 * internal use.
 * 
 */
const DEFAULT_RFCTBUNDLE = /** @satisfies {(options: { sfm: readonly SrcFileInfAnalysis[] } ) => object } */ ({ sfm, }) => {
  ;
  
  const runChunkCompileTask = () => {} ;

  //
  const RFCT = /** @satisfies {(options: { sfm: readonly SrcFileInfAnalysis[] } ) => Object } */ ({ sfm, }) => {
    ;
    const allCompiles = (
      sfm
      .map(opt => {
        const { fullSrcContents, fullSrcText, srcPath, } = opt ;

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
            } catch (/** @type {any} */ e) { return throwTypeError(`malformed bytecode: ${e }`, e ) ; }
          } )()
          .then(fnc => {
            try {
              return fnc() ;
            } catch (/** @type {any} */ e) {
              return throwTypeError(`exception while extracting the described Function: ${e }`, e ) ;
            }
          } )
        ) ;

        return /** @satisfies {SrcFileInfAnalysis } */ ({
          fullSrcContents ,
          fullSrcText ,
          srcPath ,
          ... {
            //
            opt ,
            objCode ,
            objCodeEvaluatedUnappliedPr ,
          }
        }) ;
      })
    ) ;

    return { allCompiles, } ;
  } ;


  const runFinalCompileTask = () => {
    ;

    const {
      allCompiles ,
    } = RFCT({ sfm, }) ;

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

    ;
  } ;

  return {
    //
    runChunkCompileTask ,
    runFinalCompileTask ,
  } ;
} ;



export default DEFAULT_RFCTBUNDLE ;











