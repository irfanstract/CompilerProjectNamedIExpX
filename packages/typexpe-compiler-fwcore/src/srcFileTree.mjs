

import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";

import { blobFromUtf } from "typexpe-commons/src/utfCodec.mjs";



import { SourceTreeMappingException } from "./compileExceptions.mjs";




/**
 * the default URL to be assigned for references to {@link process.argv the app's main-module }.
 * 
 */
const stdMainModuleUrl = "app-main:" ;

export { stdMainModuleUrl } ;


/**
 * a SrcTree describing
 * a single-file src-tree
 * with that one file being an unnamed file whose contents is exactly the given string.
 * 
 */
const getFromSnippetAsSingleFileSourceTree = /** @satisfies {(x: String) => Object } */ ((code) => {
  ;

  return (
    getFromUrlToStringMapAsSourceTree({
      [stdMainModuleUrl]: code ,
    }, { mainModulePath: stdMainModuleUrl, } )
  ) ;
}) ;

export { getFromSnippetAsSingleFileSourceTree } ;

/**
 * {@link getFromUrlToStringMapAsSourceTree }. returns {@link TypicalPossiblyExecubleAppSrcTreeAnalysis }.
 * 
 */
const getFromUrlToStringMapAsSourceTree = /** @satisfies {(srcs: Readonly<{ [k: String]: String }>, config: GFTSMConfig ) => Object } */ ((srcs, config) =>
{
  const mainModulePath = config.mainModulePath ;

  return /** @type {const} */ ({
    srcFileMap: (
      Object.fromEntries(
        Object.entries(srcs )
        .map(([k, v0]) => /** @type {const } */ (
          [k, blobFromUtf(v0) ]
        ) )
      )
    ),
    ... (
      mainModulePath ?
      {
        mainModulePath,
        mainFileSrcText: srcs[mainModulePath ] ?? throwTypeError(`'mainModulePath' defined, but no such entry in 'srcs'. ${JSON.stringify({ mainModulePath, srcs, }) } `) ,
      }
      : { mainModulePath: null, mainFileSrcText: null }
    ),
  }) ;
}) ;

export { getFromUrlToStringMapAsSourceTree } ;

/**
 * @typedef {Readonly<{ mainModulePath ?: String, }>} GFTSMConfig
 * 
 */

/**
 * FOR DEVS:
 * avoid using `Extract` or `Pick` since Rename wouldn't properly update the string-literal(s) ;
 * use `Exclude` or `Omit` instead
 */

/**
 * @typedef {ReturnType<typeof getFromSnippetAsSingleFileSourceTree > } TypicalPossiblyExecubleAppSrcTreeAnalysis
 * 
 */
const TypicalPossiblyExecubleAppSrcTreeAnalysis = {} ;

/**
 * selection of {@link TypicalPossiblyExecubleAppSrcTreeAnalysis } which sets these fields to `null`
 * 
 * @typedef {Exclude<TypicalPossiblyExecubleAppSrcTreeAnalysis, { mainModulePath : {} } > } TypicalNonExecublesSrcTreeAnalysis
 * 
 */
const TypicalNonExecublesSrcTreeAnalysis = {} ;

/**
 * a subset of fields of {@link TypicalNonExecublesSrcTreeAnalysis}
 * 
 * @typedef {Omit<TypicalNonExecublesSrcTreeAnalysis, "mainModulePath" | "mainFileSrcText" > } TypicalLibraryOnlySrcTreeAnalysis
 * 
 */
const TypicalLibraryOnlySrcTreeAnalysis = {} ;

export {
  TypicalPossiblyExecubleAppSrcTreeAnalysis ,
  TypicalNonExecublesSrcTreeAnalysis ,
  TypicalLibraryOnlySrcTreeAnalysis ,
} ;





