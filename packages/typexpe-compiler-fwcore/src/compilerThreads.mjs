



import { throwTypeError, throwAssertionError, util, Deferred } from "typexpe-commons/src/common_sv.mjs";




import {
  newAbortPointCtx,
  expandAbortSignalObjAsCtx,
} from "typexpe-compiler-fwcore/src/spclControlFlowAbortCtx.mjs";



import {
  SrcFileInfDecodeAnalysis,
} from "./srcFileTreePreload.mjs";

import {
  TypicalPossiblyExecubleAppSrcTreeAnalysis,
  XAppUrl,
} from "./srcFileTree.mjs";



/**
 * @typedef {{ as_RCCL ?: any } & ((options: { sfm: readonly SrcFileInfDecodeAnalysis[] } ) => ChunkCallableCompileTask ) } ChunkCallableCompiledLang
 * 
 * @see ChunkCallableCompiledLang
 * 
 */
export const ChunkCallableCompiledLang = {} ;

/**
 * @typedef {{ as_RCCT ?: any } & { runChunkCompileTask: () => void, runFinalCompileTask: () => void, } } ChunkCallableCompileTask
 * 
 * @see ChunkCallableCompileTask
 * 
 */
export const ChunkCallableCompileTask = {} ;

/**
 * 
 * @param { Omit<ChunkCallableCompileTask, "as_RCCT"> } impl
 * @returns { ChunkCallableCompileTask }
 * 
 */
export function RFCTBUNDLE(impl) {
  return impl ;
}







