


import { assert } from "typexpe-commons/src/common_sv.mjs";








import { SyntaxError, TypeError, } from "typexpe-compiler-fwcore/src/compileExceptionsExtended.mjs";

export { SyntaxError, TypeError } ;

import { PostCompiledCodeError, NoCodeInSrcTextException, } from "typexpe-compiler-fwcore/src/compileExceptionsExtended.mjs";

export { PostCompiledCodeError, NoCodeInSrcTextException, } ;





const execAsync = (
  /**
   * 
   * @param {String} code
   * @param {{ compilerOptions ?: { onEncounteringZeroCodeSrcText ?: (srcTree: (Exclude<TypicalPossiblyExecubleAppSrcTreeAnalysis, { mainFileSrcText : (null) } >) ) => ({ altReturnValue: any } | null ) } }} [options]
   * 
   * @return {Promise<{ returnValue: any, }> }
   * @throws {NoCodeInSrcTextException }
   * 
   */
  async function execImpl(code, options = {} )
  {
    ;

    const { compilerOptions = {}, } = options ;
    const {
      onEncounteringZeroCodeSrcText = (srcTree) => {
        const code = srcTree.mainFileSrcText ;
        if (code.match(/^[\s]*$/) ) {
          return { altReturnValue: void 0, } ;
        }
        throw new NoCodeInSrcTextException(`whitespace-only src-text`) ;
      },
    } = compilerOptions ;

    console["log"](`evaluating code`, { code, } ) ;

    const srcTree = (
      getFromSnippetAsSingleFileSourceTree(code)
    ) ;
  
    console["log"](`evaluating src-tree`, { srcTree, } ) ;

    return await (/** @return {Promise<ReturnType<typeof execImpl>> } */ async function compileAndRunImpl() {
      ;

      assert(srcTree.mainModulePath) ;

      const code = srcTree.mainFileSrcText ;

      if (code.match(/^[\s]*$/) ) {
        const r = onEncounteringZeroCodeSrcText(srcTree ) ;
        if (r) {
          return { returnValue: r.altReturnValue } ;
        }
      }

      if (1) {
        const jb = startCompilerRunOnSrcTree(srcTree) ;
        const { finished, } = await jb.pr.out ;
        if (finished)
        {
          return {
            returnValue: null ,
          } ;
        }
      }
  
      throw new TypeError(`TODO execImpl of code ${JSON.stringify(code) } `) ;
    } )() ;
  }
) ;

export { execAsync, } ;



import { startCompilerRunOnSrcTree } from "./compilerJob.mjs";



import { getFromSnippetAsSingleFileSourceTree, } from "typexpe-compiler-fwcore/src/srcFileTree.mjs";

import {
  // @ts-ignore
  TypicalPossiblyExecubleAppSrcTreeAnalysis,
} from "typexpe-compiler-fwcore/src/srcFileTree.mjs";











