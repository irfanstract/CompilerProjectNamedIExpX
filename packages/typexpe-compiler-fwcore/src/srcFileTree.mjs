

import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";





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
 * {@link getFromUrlToStringMapAsSourceTree }
 * 
 */
const getFromUrlToStringMapAsSourceTree = /** @satisfies {(srcs: Readonly<{ [k: String]: String }>, config: GFTSMConfig ) => Object } */ ((srcs, config) =>
{
  const mainModulePath = config.mainModulePath ;

  return /** @type {const} */ ({
    srcFileMap: srcs,
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
 * @typedef {ReturnType<typeof getFromSnippetAsSingleFileSourceTree > } TypicalSrcTreeRepr
 * 
 */
const TypicalSrcTreeRepr = {} ;

export { TypicalSrcTreeRepr } ;





