

import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";





import TS from "typescript" ;






import {
  isBlockLike,
  isFieldOrItemValueAccess ,
  getFieldOrItemValueAccessElements ,
} from "./tsExtraSyntaxKinds.mjs";

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
 * attempt to
 * fix broken function-ref(s) (for example, {@link Reflect.apply automatic receiver-insertion only happens for member-functions directly invoked like `receiver.meth(...)`, but will go away when aliased like `return receiver.meth` } ) by
 * returning the rewritten expr (for the above "missing receiver" case, `(...args) => receiver.meth(...args)` )
 * 
 * does not {@link TS.factory.updateBlock mutate } the {@link TS.Node} passed.
 * 
 * TODO support for `new`
 * 
 */
export const healPseudoCurriedFunctionRef = /** @type {(x: TS.Expression, options: ({ asConstructor: true, asAsync?: false, asGenerator?: false, } | { asConstructor: false | null, asAsync: Boolean, asGenerator: Boolean, }) ) => TS.Expression } */ (...[calleeRef, optionsArg ]) => {
  ;

  const options = (optionsArg.asConstructor ? /** @type {const } */ ({ inAwaitCtx: false, inGenerator: false, ...optionsArg }) : optionsArg ) ;

  const { asConstructor, asAsync: inAwaitCtx, asGenerator: inGenerator, } = options ;

  if (1) {
    ;
    if (TS.isIdentifier(calleeRef) )
    { return calleeRef ; }
  }
  
  /**
   * early-checking
   */
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
   * in the uncommon case of `meth(...<arg-list-1>)(...<arg-list-2>)`,
   * by the spec,
   * the second `[[Call]]` (ie one with `<arg-list-2>`)
   * will unconditionally go without `this`-arg ;
   * there's no point playing with that here
   * 
   */
  if (TS.isCallExpression(calleeRef) )
  { return calleeRef ; }

  /**
   * in case of {@link isCommaListExpression }, {@link isConditionalExpression }, and any other homo-morphic examples,
   * let's just move to the operands themselves
   * 
   */
  {
    if (TS.isCommaListExpression(calleeRef) )
    {
      return (
        TS.factory.createCommaListExpression((
          calleeRef.elements
          .toReversed()
          .map((e, i) => ((i === 0 ) ? healPseudoCurriedFunctionRef(e, optionsArg ) : e) )
          .toReversed()
        ))
      ) ;
    }

    if (TS.isConditionalExpression(calleeRef) )
    {
      return (
        TS.factory.createConditionalExpression(calleeRef.condition, undefined, (
          healPseudoCurriedFunctionRef(calleeRef.whenTrue, optionsArg )
        ), undefined, (
          healPseudoCurriedFunctionRef(calleeRef.whenFalse, optionsArg)
        ))
      ) ;
    }
  }

  // TODO
  /**
   * in general, including simple "unqualified" `fetch(...)` and `new UInt8Array(bufSize)` and `setTimeout(callbk, tMillis)`,
   * let's just return properly-rewritten expr
   * 
   */
  {
    const argsBName = "args" ;

    const mainVarargsDeclarShape = (
      TS.factory.createParameterDeclaration([], TS.factory.createToken(TS.SyntaxKind.DotDotDotToken) , argsBName, undefined, undefined, undefined )
    ) ;
    const mainVarargsSpreadShape = (
      TS.factory.createSpreadElement(TS.factory.createIdentifier(argsBName ) )
    ) ;

    if ((asConstructor === false ) && isFieldOrItemValueAccess(calleeRef) )
    {
      /**
       * return
       * IIFE `((receiver) => (...actualArgs) => receiver.meth(...actualArgs) )(<actualReceiver> )`
       * .
       * this placement/positioning of `<actualReceiver>`
       * is necessary since the receiving term/expr could synchronously involve `yield` or `await`
       * .
       * 
       */
      {
        const [actualReceiverRef, kRef ] = getFieldOrItemValueAccessElements(calleeRef) ;
  
        const recreivingBName = "receiver" ;
  
        const dispatcherFactoryLiteral = (
          //
          TS.factory.createArrowFunction([], undefined, [(
            //
            TS.factory.createParameterDeclaration([], undefined , recreivingBName, undefined, undefined, undefined )
          ) ], undefined, undefined, (
            //
            TS.factory.createArrowFunction([], undefined, [mainVarargsDeclarShape], undefined, undefined, (
              /* `receiver.m(...args)` */
              TS.factory.createCallExpression((
                TS.factory.createElementAccessExpression((
                  TS.factory.createIdentifier(recreivingBName)
                ) , kRef )
              ), undefined, [mainVarargsSpreadShape,] )
            ) )
          ) )
        ) ;
        return (
          TS.factory.createCallExpression(dispatcherFactoryLiteral, undefined, [actualReceiverRef] )
        ) ;
      }
    }

    /**
     * at this point {@link calleeRef} can only be something safely directly movable
     * (hopefully)
     */
    if (asConstructor === false ) { return calleeRef ; }
    
    /**
     * nothing can and needs to be done on {@link Reflect.construct *constructor*s } wrt receiver(s).
     */
    if (asConstructor === true ) { return calleeRef ; }

    return (
      //
      (1 ? throwTypeError(`. ${JSON.stringify({ asConstructor, calleeRef }) }` ) : calleeRef )
    ) ;
  }
} ;







