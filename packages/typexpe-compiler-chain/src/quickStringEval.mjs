











import { SyntaxError, TypeError, } from "typexpe-compiler-fwcore/src/compileExceptionsExtended.mjs";

export { SyntaxError, TypeError } ;

import { PostCompiledCodeError, NoCodeInSrcTextException, } from "typexpe-compiler-fwcore/src/compileExceptionsExtended.mjs";

export { PostCompiledCodeError, NoCodeInSrcTextException, } ;





const exec = (
  /**
   * 
   * @param {String} code
   * @param {{ compilerOptions ?: { onEncounteringZeroCodeSrcText ?: (srcTree: TypicalSrcTreeRepr ) => ({ altReturnValue: any } | null ) } }} [options]
   * 
   * @return {{ returnValue: any, } }
   * @throws {NoCodeInSrcTextException }
   * 
   */
  function execImpl(code, options = {} )
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

    return (/** @return {ReturnType<typeof execImpl> } */ function compileAndRunImpl() {
      ;

      const code = srcTree.mainFileSrcText ;

      if (code.match(/^[\s]*$/) ) {
        const r = onEncounteringZeroCodeSrcText(srcTree ) ;
        if (r) {
          return { returnValue: r.altReturnValue } ;
        }
      }
  
      throw new TypeError(`TODO execImpl of code ${JSON.stringify(code) } `) ;
    } )() ;
  }
) ;

export { exec } ;



import { getFromSnippetAsSingleFileSourceTree, } from "typexpe-compiler-fwcore/src/srcFileTree.mjs";

import {
  TypicalSrcTreeRepr,
} from "typexpe-compiler-fwcore/src/srcFileTree.mjs";











