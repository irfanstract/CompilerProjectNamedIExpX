

import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";



import TS from "typescript" ;





const awaitify = /** @satisfies {(x: String, options?: { eH?: TS.EmitHint, } ) => {} } */ (...[x, { eH = TS.EmitHint.Unspecified , } = {}] ) => {
  const fName = "<repl>" ;

  const xTr = TS.createSourceFile(fName, x, (
    TS.ScriptTarget.ES2020
    // /** @satisfies {TS.CreateSourceFileOptions } */ ({ languageVersion: "ES2020", })
  ), true ) ;

  const xFinalTr = (
    awaitifyAst(xTr)
  ) ;

  return (
    TS.createPrinter().printNode(eH, xFinalTr, xFinalTr.getSourceFile() )
  ) ;
} ;

const awaitifyAst = (() => {
  ;

  /** @typedef {{ [k in (0 | 1)]: { lvl: k, value: TS.Node } } extends infer S ? S[keyof S] : never } SpclObjCodeHeavywt */

  /** @typedef {TS.Node } SpclObjCode */

  const checkSpclObjcBeingLvl = /** @type {<const l extends SpclObjCodeHeavywt["lvl"]>(x: SpclObjCodeHeavywt, expectedLv: l) => asserts x is Extract<SpclObjCodeHeavywt, { lvl: l }> } */ (c, expectedLv) => { (c.lvl === expectedLv ) || throwTypeError(JSON.stringify(c) ) ; } ;

  /**
   * unary-expression(s), including `await` and `yield`
   * 
   * @type {<const T extends (TS.YieldExpression | TS.AwaitExpression | TS.UnaryExpression )>(x: T, options?: {} ) => TS.Expression }
   */
  function asyncifyUnaryExpressionImpl(...[x, {} = {}])
  {
    ;
    
    if (TS.isYieldExpression(x) )
    {
      return (
        x.asteriskToken ?
        TS.factory.createYieldExpression(x.asteriskToken, (
          asyncifyTermImpl(x.expression ?? throwTypeError(`unexpected bulk-yield without operand.`) )
        ))
        :
        TS.factory.createYieldExpression(undefined, (
          x.expression && asyncifyTermImpl(x.expression )
        ))
      ) ;
    }
    if (TS.isAwaitExpression(x) )
    {
      return (
        TS.factory.createAwaitExpression((
          asyncifyTermImpl(x.expression )
        ))
      ) ;
    }
    if (TS.isPrefixUnaryExpression(x) )
    {
      return (
        TS.factory.createPrefixUnaryExpression(x.operator, (
          asyncifyTermImpl(x.operand )
        ))
      ) ;
    }
    if (TS.isPostfixUnaryExpression(x) )
    {
      return (
        TS.factory.createPostfixUnaryExpression((
          asyncifyTermImpl(x.operand )
        ), x.operator )
      ) ;
    }

    return x ;
  }

  /**
   * 
   * @type {<const T extends TS.PropertyAccessExpression | TS.ElementAccessExpression>(x: T, options?: {} ) => TS.Expression }
   */
  function asyncifyFieldValueReference(...[x, {} = {}])
  {
    return (
      asyncifyTermImplOutermost((
        asyncifyFieldValueReference1(x)
      ))
    ) ;
  }

  /**
   * {@link asyncifyFieldValueReference} without the outermost {@link asyncifyTermImplOutermost}
   * 
   * @type {<const T extends TS.PropertyAccessExpression | TS.ElementAccessExpression>(x: T, options?: {} ) => TS.Expression }
   */
  function asyncifyFieldValueReference1(...[x, {} = {}])
  {
    ;
    
    const { expression: lhs0, } = x ;

    const lhs2 = asyncifyTermImpl(lhs0) ;
  
    if (TS.isPropertyAccessExpression(x) )
    {
      const { name: rhs0, } = x ;
  
      const rhs2 = (
        rhs0
      ) ;
  
      return (
        TS.factory.createPropertyAccessExpression(lhs2, rhs2 )
      ) ;
    }
    
    if (TS.isElementAccessExpression(x) )
    {
      const { argumentExpression: rhs0, } = x ;
  
      const rhs2 = (
        asyncifyTermImpl(rhs0)
      ) ;
  
      return (
        TS.factory.createElementAccessExpression(lhs2, rhs2 )
      ) ;
    }

    return x ;
  }

  /**
   * variant of {@link asyncifyTermImpl } specifically intended for `[[Call]]`s :
   * ```
   * s.t.u.defineVars(3)
   * // treated as:
   * (s.t.u ).defineVars<with!!>(3)
   * 
   * [s, t].u.defineVars(3)
   * // treated as:
   * ([s, t].u ).defineVars<with!!>(3)
   * ```
   * 
   * TODO
   * 
   * @type {<const T extends TS.Expression>(x: T, options?: {} ) => TS.Expression }
   */
  function asyncifyDispatchedFunctionRefImpl(...[x, {} = {}])
  {
    ;

    if (TS.isPropertyAccessExpression(x) || TS.isElementAccessExpression(x) )
    {
      return (
        asyncifyFieldValueReference1(x)
      ) ;
    }
    return (
      asyncifyTermImpl(x)
    ) ;
  }
  
  /**
   * 
   * @type {<const T extends TS.Expression>(x: T, options?: {} ) => TS.Expression }
   */
  function asyncifyTermImpl(...[x, {} = {}])
  {
    ;

    {
      ;
      
      /**
       * TODO
       * 
       */
      if (TS.isParenthesizedExpression(x) )
      {
        return asyncifyTermImpl(x.expression) ;
      }

      /**
       * these two are {@link Reflect intrinsic } ops with semantic of "suspend" ;
       * we consider it an unecessary source of extra overhead
       * 
       */
      if (TS.isYieldExpression(x) || TS.isAwaitExpression(x) )
      {
        return x ;
      }

      /**
       * if it's a constant-expression (including reference `import.meta` or `this` or `new.target`),
       * it won't need asyncification
       * 
       */
      if (TS.isLiteralExpression(x) || (x.kind === TS.SyntaxKind.ThisKeyword ) || (x.kind === TS.SyntaxKind.MetaProperty ) )
      {
        return x ;
      }
      
      if (TS.isBinaryExpression(x) )
      {
        ;
        // TODO
        return (
          TS.factory.createBinaryExpression((
            x.operatorToken.kind !== TS.SyntaxKind.EqualsToken ?
            asyncifyTermImpl(x.left)
            : x
          ), x.operatorToken, asyncifyTermImpl(x.right) )
        ) ;
      }

      if (TS.isConditionalExpression(x) )
      {
        ;
        // TODO
        return (
          TS.factory.createConditionalExpression(asyncifyTermImpl(x.condition), undefined, asyncifyTermImpl(x.whenTrue), undefined, asyncifyTermImpl(x.whenFalse) )
        ) ;
      }

      // TODO
      if (TS.isCallExpression(x))
      {
        return (
          TS.factory.createCommaListExpression([
            ...(0 ? [IF_TIRED_THEN_AWAIT] : [] ) ,
            adaptedCreateCallExpression(x.expression , x.typeArguments, x.arguments, { asConstructor: false, inGenerator: (
              // TODO
              false
            ) } ) ,
          ])
        ) ;
      }

      if (TS.isArrayLiteralExpression(x) )
      {
        ;
        // TODO
        return (
          TS.factory.createArrayLiteralExpression((
            x.elements
            .map(e => {
              switch (e.kind) {
                default:
                  return (
                    asyncifyTermImpl(e)
                  ) ;
              }
            })
          ))
        ) ;
      }

      if (TS.isFunctionExpression(x) || TS.isArrowFunction(x) )
      {
        return (
          asyncifyFunctionLiteralTerm(x)
        ) ;
      }

      if (TS.isPropertyAccessExpression(x) || TS.isElementAccessExpression(x) )
      {
        return asyncifyFieldValueReference(x) ;
      }

      if ((
        false
        || TS.isYieldExpression(x)
        || TS.isAwaitExpression(x)
        || TS.isPrefixUnaryExpression(x)
        || TS.isPostfixUnaryExpression(x)
      ) )
      {
        return (
          asyncifyUnaryExpressionImpl(x)
        ) ;
      }
      
      if (TS.isSpreadElement(x) )
      {
        return (
          TS.factory.createSpreadElement((
            asyncifyTermImpl(x.expression )
          ))
        ) ;
      }

      return (
        asyncifyTermImplOutermost(x)
      ) ;
    }

    if (TS.isConditionalExpression(x) )
    {
      ;
      // TODO
    }

    return x ;
  }

  // (/✅ /) ;
  // /^[Á]$/u;
  // /^[❇️]$/u;
  // /^[👶🏻]$/u;
  // /^[🇯🇵]$/u;
  // /^[👨‍👩‍👦]$/u;
  // /^[👍]$/;

  /**
   * {@link asyncifyTermImplOutermost }
   * simply returns `(await nextMicrotask(), ${x } )` without even studying the operand.
   * 
   * @type {<const T extends TS.Expression>(x: T, options?: {} ) => TS.Expression }
   */
  function asyncifyTermImplOutermost(...[x, {} = {}])
  {
    return (
      TS.factory.createCommaListExpression([
        IF_TIRED_THEN_AWAIT ,
        x ,
      ])
    ) ;
  }

  /**
   * 
   * @type {<const T extends (TS.FunctionExpression | TS.ArrowFunction)>(x: T, options?: {} ) => TS.Expression }
   */
  function asyncifyFunctionLiteralTerm(...[x, {} = {}])
  {
    ;

    const newModifiersSet = (
      [...(x.modifiers || [] ), TS.factory.createModifier(TS.SyntaxKind.AsyncKeyword ) ]
    );

    const newBody = (
      // x.body
      asyncifyStatementImpl(x.body)
    ) ;
    
    //
    return (
      TS.factory.createCallExpression(FROM_ASYNCIFIED_FUNCTION_LITERAL, undefined, [(TS.isArrowFunction(x) ? (
        // 3
        TS.factory["createArrowFunction"](newModifiersSet, x.typeParameters, x.parameters, undefined, undefined, newBody )
      ) : (
        TS.factory["createFunctionExpression"](newModifiersSet, x.asteriskToken, x.name, x.typeParameters, x.parameters, undefined, newBody )
      ))] )
    ) ;
  }

  const ftwtNamespaceImpl = /** @type {const } */ ({
    get currentThreadTired() { return false ; } ,
    nextMicrotask: () => /** @satisfies {Promise<unknown> } */ (new Promise(resolve => setImmediate(resolve) )) ,
    syncFunctionAlikeFromAsyncifiedFunctionLiteral: /** @satisfies {(x: Function) => Object } */ (applyAsyncImpl) => {
      // TODO
      return {
        applyAsync: applyAsyncImpl ,
      } ;
    } ,
    startDispatchOf: /** @satisfies {<A extends ReadonlyArray<unknown>, const R>(x: FtwtFUnction<A, R> , ...args1: A ) => Object } */ (impl, ...args) => {
      // TODO
      const pr = ("applyAsync" in impl ? impl.applyAsync : impl )(...args) ;
      return {
        promise: pr ,
      } ;
    } ,
  }) ;
  /**
   * @typedef {{ applyAsync: (...args: A) => Promise<R> } | ((...args: A) => Promise<R> ) } FtwtFUnction
   * 
   * @template {ReadonlyArray<unknown>} A
   * @template R
   * 
   */

  // globalThis.Function.TechnicalAwaitOps = ftwtNamespaceImpl ;
  // Object.assign(globalThis.Function, { TechnicalAwaitOps: ftwtNamespaceImpl, } ) ;
  (/** @type {{ TechnicalAwaitOps ?: Required<{ value?: unknown }>["value"] }} */ (globalThis.Function) ).TechnicalAwaitOps ??= ftwtNamespaceImpl ;
    
  /**
   * reference to an ad-hoc name-space for these stuffs
   * 
   */
  const ftmtNsRef = (() => {
    /** @type {TS.Expression} */ let e = TS.factory.createIdentifier("globalThis") ;
    e = TS.factory.createPropertyAccessExpression(e , "Function" ) ;
    e = TS.factory.createPropertyAccessExpression(e , "TechnicalAwaitOps" ) ;
    return e ;
  })() ;

  const QUERY_WHETHER_TIRED = (
    TS.factory.createPropertyAccessExpression(ftmtNsRef, "currentThreadTired" )
  ) ;

  const AWAIT = (
    TS.factory.createAwaitExpression((
      //
      TS.factory.createCallExpression((
        TS.factory.createPropertyAccessExpression(ftmtNsRef, "nextMicrotask" )
      ), undefined, [] )
    ))
  ) ;

  /**
   * AST for `(Thread.currentThreadTired && Thread.promiseFactory.nextMicrotask() )`
   * 
   */
  const IF_TIRED_THEN_AWAIT = (
    TS.factory.createBinaryExpression(QUERY_WHETHER_TIRED, TS.factory.createToken(TS.SyntaxKind.AmpersandAmpersandToken) , AWAIT)
  ) ;
  
  const FROM_ASYNCIFIED_FUNCTION_LITERAL = (
    TS.factory.createPropertyAccessExpression(ftmtNsRef, "syncFunctionAlikeFromAsyncifiedFunctionLiteral" )
  ) ;

  const mockupIntrinsicCallDispatchingMethod = (
    TS.factory.createPropertyAccessExpression(ftmtNsRef, "startDispatchOf" )
  ) ;

  /**
   * 
   * 
   */
  // TS.factory.createCallExpression
  const adaptedCreateCallExpression = /** @param {[...Parameters<typeof TS.factory.createCallExpression > , { asConstructor: Boolean, inGenerator: Boolean } ] } args */ (...[calleeRef, typeArgs, argsLiteral, { asConstructor, inGenerator, } ]) => {
    ;
    const fixedMainCallExpr = (
      TS.factory.createAwaitExpression((
        TS.factory.createPropertyAccessExpression((
          TS.factory.createCallExpression((
            mockupIntrinsicCallDispatchingMethod
          ) , typeArgs, [(
            healPseudoCurriedFunctionRef(
              asyncifyDispatchedFunctionRefImpl(calleeRef ),
              asConstructor ? { asConstructor, } : { asConstructor, asAsync: false, asGenerator: inGenerator, } )
          ), ...(
            [...(argsLiteral ?? [])]
            .map(e => asyncifyTermImpl(e) )
          )] )
        ) , "promise" )
      ))
    ) ;
    return (
      TS.factory.createCommaListExpression([
        ...(0 ? [IF_TIRED_THEN_AWAIT] : [] ) ,
        fixedMainCallExpr ,
      ])
    ) ;
  } ;

  // @ts-ignore
  /**
   * @type {{ <const T extends TS.Block>(x: T, options?: {} ): TS.Block ; <const T extends TS.Statement>(x: T, options?: {} ): TS.Statement ; <const T extends TS.SourceFile>(x: T, options?: {} ): TS.BlockLike ; } }
   */
  // @ts-ignore
  function asyncifyStatementImpl(...[x, {} = {}]) {
    ;

    if (TS.isExpressionStatement(x) ) {
      return TS.factory.createExpressionStatement(asyncifyTermImpl(x.expression) ) ;
    }
    
    if (TS.isVariableStatement(x) ) {
      return TS.factory.createVariableStatement(x.modifiers, (
        x.declarationList.declarations
        .map(d => (
          TS.factory.createVariableDeclaration(d.name, d.exclamationToken, d.type, (
            d.initializer ? asyncifyTermImpl(d.initializer) : undefined
          ) )
        ) )
      ) ) ;
    }

    if (isBlockLike(x) )
    {
      ;
      // TODO
      if (TS.isBlock(x) ) {
        return (
          TS.factory.createBlock((
            x.statements
            .map(e => asyncifyStatementImpl(e) )
          ))
        ) ;
      }
      if (TS.isModuleBlock(x) ) {
        return (
          TS.factory.createModuleBlock((
            x.statements
            .map(e => asyncifyStatementImpl(e) )
          ))
        ) ;
      }
      if (TS.isSourceFile(x) ) {
        return (
          TS.factory.createBlock((
            x.statements
            .map(e => asyncifyStatementImpl(e) )
          ))
        ) ;
      }
    }

    return x ;
  }

  return /** @satisfies {<const T extends TS.Node>(x: T, options?: {} ) => TS.Node } */ (
    /**
     * 
     * 
     */
    function asyncifyAstImpl(...[x, {} = {}]) {
      ;

      if (TS.isExpression(x) )
      {
        return asyncifyTermImpl(x) ;
      }

      if (TS.isStatement(x) || isBlockLike(x) )
      {
        return asyncifyStatementImpl(x) ;
      }
      if (TS.isSourceFile(x) )
      {
        return asyncifyStatementImpl(x) ;
      }

      return x ;
    }
  ) ;
})() ;

export { awaitify } ;

export { awaitifyAst } ;




import { isBlockLike } from "./tsExtraSyntaxKinds.mjs";

import { getSyntaxKindString } from "./tsExtraSyntaxKinds.mjs";

import { checkSensibleCalleeRef, } from "./functionTerms.mjs";

import { healPseudoCurriedFunctionRef, } from "./functionTerms.mjs";




;

/**
 * specially-crafted string-token list
 * 
 * @typedef {readonly string[] } SpclStringTokenSeq
 * 
 */









