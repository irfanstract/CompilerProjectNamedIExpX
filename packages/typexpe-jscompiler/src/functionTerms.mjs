

import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";





import TS from "typescript" ;






import { isBlockLike } from "./tsExtraSyntaxKinds.mjs";

import { getSyntaxKindString } from "./tsExtraSyntaxKinds.mjs";

export const checkSensibleCalleeRef = /** @satisfies {(x: TS.Expression, options: { asConstructor: Boolean, } ) => void } */ (...[calleeRef, options ]) => {
  ;

  const { asConstructor, } = options ;
  
  if ((
    false
    || (calleeRef.kind === TS.SyntaxKind.VoidExpression )
    || (calleeRef.kind === TS.SyntaxKind.UndefinedKeyword )
    || (calleeRef.kind === TS.SyntaxKind.NullKeyword )
  ) )
  { return throwTypeError(`erroneous receiving-term kind ${getSyntaxKindString(calleeRef.kind) }, check your code! `) ; }

  if ((
    false
    || TS.isNumericLiteral(calleeRef)
    || TS.isStringLiteralLike(calleeRef)
    || TS.isRegularExpressionLiteral(calleeRef)
    || TS.isArrayLiteralExpression(calleeRef)
    || TS.isObjectLiteralExpression(calleeRef)
  ) )
  { return throwTypeError(`non-callable term-kind ${getSyntaxKindString(calleeRef.kind) }, check your code! `) ; }
  
  if ((
    TS.isCommaListExpression(calleeRef)
  ) )
  { checkSensibleCalleeRef(calleeRef.elements.at(-1) ?? throwTypeError() , options ) ; }
  // TODO
  if (1)
  {
    if ((
      TS.isBinaryExpression(calleeRef)
    ) )
    {
      /** checking the LHS is not possible without type-checking. */
      0 && checkSensibleCalleeRef(calleeRef.left , options ) ;
      checkSensibleCalleeRef(calleeRef.right , options ) ;
    }
  }

  if ((
    TS.isClassExpression(calleeRef)
  ) && (!asConstructor ) )
  { return throwTypeError(`missing 'new' keyword for ${getSyntaxKindString(calleeRef.kind) }, check your code! `) ; }
  if ((
    TS.isArrowFunction(calleeRef)
  ) && (asConstructor ) )
  { return throwTypeError(`unsupported 'new' keyword for ${getSyntaxKindString(calleeRef.kind) }, check your code! `) ; }

} ;

/**
 * fix {@link Reflect.apply broken function-ref `some.doOpcode1` },
 * by rewriting it into `(...args) => some.doOpcode1(...args)` or `(...args) => new some.doOpcode1(...args)`
 * 
 */
export const healPseudoCurriedFunctionRef = /** @type {(x: TS.Expression, options: { asConstructor: Boolean | null, } ) => TS.Expression } */ (...[calleeRef, options ]) => {
  ;

  const { asConstructor, } = options ;

  if (0) {
    ;
    if (TS.isIdentifier(calleeRef) )
    { return calleeRef ; }
  }
  
  checkSensibleCalleeRef(calleeRef, { asConstructor: asConstructor ?? false, } ) ;

  /**
   * {@link TS.isLiteralExpression },
   * with the illegal-case(s) already handled by the above {@link checkSensibleCalleeRef}-call
   * 
   */
  if (TS.isLiteralExpression(calleeRef) )
  { return calleeRef ; }
  
  if (TS.isFunctionExpression(calleeRef) || TS.isArrowFunction(calleeRef) )
  { return calleeRef ; }

  /**
   * `(...args)`-ing another `doOp(...args)`
   * will unconditionally go with unset `this`-arg ;
   * there's no point doing this here
   * 
   */
  if (TS.isCallExpression(calleeRef) )
  { return calleeRef ; }

  /**
   * {@link isCommaListExpression }, {@link isConditionalExpression }, and any other holo-morphic examples
   * 
   */
  {
    if (TS.isCommaListExpression(calleeRef) )
    {
      return (
        TS.factory.createCommaListExpression((
          calleeRef.elements
          .toReversed()
          .map((e, i) => ((i === 0 ) ? healPseudoCurriedFunctionRef(e, options ) : e) )
          .toReversed()
        ))
      ) ;
    }

    if (TS.isConditionalExpression(calleeRef) )
    {
      return (
        TS.factory.createConditionalExpression(calleeRef.condition, undefined, (
          healPseudoCurriedFunctionRef(calleeRef.whenTrue, options )
        ), undefined, (
          healPseudoCurriedFunctionRef(calleeRef.whenFalse, options)
        ))
      ) ;
    }
  }
  
  // TODO
  {
    const argsBName = "args" ;
  
    return (
      TS.factory.createArrowFunction([], undefined, [(
        TS.factory.createParameterDeclaration([], TS.factory.createToken(TS.SyntaxKind.DotDotDotToken) , argsBName, undefined, undefined, undefined )
      )] , undefined, undefined, (
        (
          TS.factory[/** @satisfies {keyof typeof TS.factory } */ (
            (asConstructor === true ) ? "createNewExpression"  :
            (asConstructor === false) ? "createCallExpression" :
            throwTypeError(`. ${JSON.stringify({ asConstructor, }) }` )
          ) ](calleeRef, undefined, [(
            TS.factory.createSpreadElement(TS.factory.createIdentifier(argsBName ) )
          )] )
        )
      ) )
    ) ;
  }
} ;







