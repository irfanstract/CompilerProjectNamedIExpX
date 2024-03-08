


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

const isFieldOrItemValueAccess = /** @type {(x: TS.Expression) => x is (TS.PropertyAccessExpression | TS.ElementAccessExpression) } */ (x) => (
  TS.isPropertyAccessExpression(x)
  || TS.isElementAccessExpression(x)
) ;

const getFieldOrItemValueAccessElements = /** @satisfies {(x: (TS.PropertyAccessExpression | TS.ElementAccessExpression) ) => [TS.Expression , TS.Expression ] } */ (x) => {
  ;

  const { expression: lhs0, } = x ;

  //
  if (TS.isPropertyAccessExpression(x) )
  {
    const { name: rhs0, } = x ;

    if (rhs0.kind === TS.SyntaxKind.Identifier )
    {
      return (
        [lhs0, TS.factory.createStringLiteral((
          // TODO
          rhs0.text
        ) , false ) ]
      ) ;
    }
    else {
      return throwTypeError(`unsupported subscript-RHS ${getSyntaxKindString(rhs0.kind ) } (applied to receiver being ${getSyntaxKindString(lhs0.kind ) } ) `) ;
    }
  }

  if (TS.isElementAccessExpression(x) )
  {
    const { argumentExpression: rhs0, } = x ;

    return (
      [lhs0, rhs0]
    ) ;
  }

  return throwTypeError(`${getSyntaxKindString((
    x
    // @ts-ignore
    .kind
  )) }`) ;
} ;

export { isFieldOrItemValueAccess, getFieldOrItemValueAccessElements, } ;







