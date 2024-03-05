


import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";






import TS from "typescript" ;

const getSyntaxKindString = /** @param {TS.Node["kind"] } x */ (x) => {
  for (const enm of Object.entries(TS.SyntaxKind).filter(ent => !(ent[0].match(/^(First|Last)/g) ) ) )
  {
    if (enm[1] === x ) {
      return enm[0] ;
    }
  }
  return throwTypeError(JSON.stringify({ x })) ;
} ;

export { getSyntaxKindString } ;



/**
 * {@link TS.BlockLike } . no corresponding `isYyy` helper exposed
 * 
 */
const isBlockLike = /** @type {(x: TS.Statement | TS.Node) => x is TS.BlockLike } */ (x) => (
  TS.isBlock(x) || TS.isModuleBlock(x) || TS.isSourceFile(x) || TS.isCaseOrDefaultClause(x)
) ;

export { isBlockLike } ;







