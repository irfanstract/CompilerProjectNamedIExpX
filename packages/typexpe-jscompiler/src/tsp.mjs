

import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";



import TS from "typescript" ;

// console["log"]({ TS, } ) ;

// TS.ScriptTarget.ES2020 ;

export { TS, } ;





import { awaitify, awaitifyAst, } from "./awaitify.mjs";

export { awaitify } ;

export { awaitifyAst } ;




import { isBlockLike } from "./tsExtraSyntaxKinds.mjs";

import { getSyntaxKindString } from "./tsExtraSyntaxKinds.mjs";

const healPseudoCurriedFunctionRef = /** @param {TS.Expression } calleeRef */ (calleeRef) => {
  ;

  if (TS.isIdentifier(calleeRef) )
  { return calleeRef ; }

  if (TS.isLiteralExpression(calleeRef) )
  { return calleeRef ; }

  {
    const argsBName = "args" ;
  
    return (
      TS.factory.createArrowFunction([], undefined, [(
        TS.factory.createParameterDeclaration([], TS.factory.createToken(TS.SyntaxKind.DotDotDotToken) , argsBName, undefined, undefined, undefined )
      )] , undefined, undefined, (
        TS.factory.createCallExpression(calleeRef, undefined, [(
          TS.factory.createSpreadElement(TS.factory.createIdentifier(argsBName ) )
        )] )
      ) )
    ) ;
  }
} ;




;

/**
 * specially-crafted string-token list
 * 
 * @typedef {readonly string[] } SpclStringTokenSeq
 * 
 */









