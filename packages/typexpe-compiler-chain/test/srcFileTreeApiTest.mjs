

import assert from "assert";
import { TypeError } from "typexpe-compiler-fwcore/src/compileExceptions.mjs";
import * as SrcFileTreeAPI from "typexpe-compiler-fwcore/src/srcFileTree.mjs";








describe(`src-file-tree API test`, () => {
  ;

  it(`shall properly implement 'getFromSnippetAsSingleFileSourceTree' `, () => {
    const tr = SrcFileTreeAPI.getFromSnippetAsSingleFileSourceTree(`const me me me mine love is mine `) ;
    assert(tr.mainFileSrcText?.slice ) ;
    assert(tr.mainFileSrcText?.match ) ;
    assert(tr.mainFileSrcText?.charCodeAt ) ;
  }) ;

} ) ;












