

import { throwTypeError } from "typexpe-commons/src/common_sv.mjs";



import TS from "typescript" ;

// console["log"]({ TS, } ) ;

// TS.ScriptTarget.ES2020 ;





const asyncify = /** @satisfies {(x: String) => {} } */ (x) => {
  const fName = "<repl>" ;

  const xTr = TS.createSourceFile(fName, x, (
    TS.ScriptTarget.ES2020
    // /** @satisfies {TS.CreateSourceFileOptions } */ ({ languageVersion: "ES2020", })
  ), true ) ;

  return (
    asyncifyAst(xTr)
  ) ;
} ;

const asyncifyAst = (() => {
  ;

  /** @typedef {{ code: SpclStringTokenSeq } } SpclObjCode */

  const dchVarverbBy = () => {
    const enformat1 = /** @satisfies {(options: { name: TS.BindingName, new?: Boolean, rhsCode?: SpclStringTokenSeq, } ) => Object } */ (/** @return {SpclObjCode } */ function enformat1Impl({ name, new: declare = false, rhsCode, }) {
      return { code: [...(function* () {
        if (declare) { yield "const" ; }
        else { yield `/* REASSIGNING */` ; }
        yield* (
          toBindingExpr(name, (x) => x )
          .code
        ) ;
        if (rhsCode) {
          yield "=" ;
          yield* rhsCode ;
        }
      } )() ] } ;
    }) ;
    return { enformat1 } ;
  } ;
  
  /**
   * @typedef {{ X ?: {}, } & ReturnType<typeof dchVarverbBy> } AsyncifyImplDeclHandler
   * 
   */

  const dchDefinepropBy = /** @param {{ receiverRef: [String] }} options @return {AsyncifyImplDeclHandler } */ ({ receiverRef, }) => {
    return {
      enformat1: /** @return {ReturnType<AsyncifyImplDeclHandler["enformat1"] >} */ function enformatMethImpl({ name, new: declare, rhsCode, }) {
        ;
        return { code: [...(function* () {
          if (declare) { yield `/* DECLARING */` ; }
          else { yield `/* REASSIGNING */` ; }
          {
            // yield* receiverRef ;
            // yield "[" ;
            // yield JSON.stringify(name.code.join(" ") ) ;
            // yield "]" ;
            yield* (
              toBindingExpr(name, (x) => ({ code: [...receiverRef, "[", ...x.code.map(e => JSON.stringify(e) ), "]" ] }) )
              .code
            ) ;
          }
          if (rhsCode) {
            yield "=" ;
            yield* rhsCode ;
          }
        } )() ] } ;
      } ,
    } ;
  } ;

  const TO_BINDINGS_ITEM_OMITTEDITEM = false ;
  
  const toBindings = /** @satisfies {(x: TS.BindingPattern, compileNamedRef: (x: SpclObjCode) => SpclObjCode ) => Object } */ (/** @return {{ type: "{}", value: ReadonlyArray<Readonly<{ key: (TS.BindingElement["propertyName"] | TS.BindingElement["name"] ) & {}, value: TS.BindingElement["name"] } >> } | { type: "[]", value: ReadonlyArray<{ value: TS.BindingElement["name"] | typeof TO_BINDINGS_ITEM_OMITTEDITEM } > } } */ function toBindingsImpl(x, x1) {
    if (TS.isObjectBindingPattern(x) || TS.isArrayBindingPattern(x) )
    {
      ( /** @satisfies {TS.BindingPattern } */ (x) ) ;

      if (TS.isObjectBindingPattern(x) )
      {
        ( /** @satisfies {TS.ObjectBindingPattern } */ (x) ) ;
          
        const { elements, } = x ;

        return /** @type {const} */ ({
          type: "{}",
          value: elements.map(nd => /** @type {const } */ ({ key: nd.propertyName ?? nd.name ?? throwTypeError(), value: nd.name }) ) ,
        }) ;
      }
      
      if (TS.isArrayBindingPattern(x) )
      {
        ( /** @satisfies {TS.ArrayBindingPattern } */ (x) ) ;
        
        ( /** @satisfies {readonly TS.ArrayBindingElement[] } */ (x.elements) ) ;
        
        ( /** @satisfies {readonly TS.BindingElement[] } */ ([]) ) ;
          
        const { elements, } = x ;

        return /** @type {const} */ ({
          type: "[]",
          value: elements.map((nd, i) => {
            if (TS.isBindingElement(nd) ) {
              return /** @type {const } */ ({ value: nd.name }) ;
            }
            if (TS.isOmittedExpression(nd) ) {
              return /** @type {const } */ ({ value: TO_BINDINGS_ITEM_OMITTEDITEM }) ;
            }
            return throwTypeError() ;
          } ) ,
        }) ;
      }
    }

    return throwTypeError() ;
  }) ;

  const toBindingExpr = /** @satisfies {(x: TS.BindingName, compileNamedRef: (x: SpclObjCode) => SpclObjCode ) => {} } */ (/** @return {SpclObjCode} */ function toBindingExprImpl(x, compileNamedRef) {
    if (TS.isIdentifier(x) )
    {
      return { code: [ ...(compileNamedRef({ code: [x.text] }) ).code ] } ;
    }
    if (TS.isObjectBindingPattern(x) || TS.isArrayBindingPattern(x) )
    {
      ( /** @satisfies {TS.BindingPattern } */ (x) ) ;
      
      const bndgs = toBindings(x, (x3) => compileNamedRef(x3) ) ;
      switch (bndgs.type) {
        case "[]" :
          return { code: ["[", ...(function* () {
            for (const { value: b } of bndgs.value) {
              yield* (b ? toBindingExprImpl(b, compileNamedRef).code : [`/* omit this slot */`] ) ;
              yield "," ;
            }
          } )(), "]" ] } ;
        case "{}" :
          return { code: ["{", ...(function* () {
            for (const { key: keyExp, value: vaExp } of bndgs.value) {
              yield "[" ;
              yield* ({ code: [JSON.stringify(keyExp.getFullText() ) ] } ).code ;
              yield "]" ;
              yield ":" ;
              yield* toBindingExprImpl(vaExp, compileNamedRef ).code ;
              yield "," ;
            }
          } )(), "}" ] } ;
        default:
          return throwTypeError() ;
      }
    }
    return throwTypeError() ;
  }) ;
  
  return /** @satisfies {(x: TS.Node ) => {} } */ (
    /**
     * 
     * @param {({ declarationHandler: AsyncifyImplDeclHandler } & { asAssignmentTarget: boolean }) } [optionsArg]
     * 
     * @return {{ type: "Statement" | `${"Read" }Expression`, code: SpclStringTokenSeq ; } }
     */
    function asyncifyAstImpl(x, optionsArg, )
    {
      ;
  
      const {
        declarationHandler: thisLvlDeclarationHandler ,
        asAssignmentTarget = false ,
      } = optionsArg || {
        declarationHandler: dchDefinepropBy({ receiverRef: ["this1"], }) ,
      } ;

      const byPlainSynchronousStatement = /** @satisfies {(oc: SpclStringTokenSeq ) => ReturnType<typeof asyncifyAstImpl> } */ (oc) => {
        return /** */ ({ type: "Statement", code: oc, }) ;
      } ;

      const byPlainSynchronousTermRef = /** @satisfies {(oc: SpclStringTokenSeq ) => ReturnType<typeof asyncifyAstImpl> } */ (oc) => {
        return /** */ ({ type: "ReadExpression", code: oc, }) ;
      } ;

      // TODO
      if (TS.isExpression(x) )
      {
        ;
        if (TS.isLiteralExpression(x) )
        {
          ;
          return byPlainSynchronousTermRef(["/* literal */", x.text ]) ;
        }
        return byPlainSynchronousTermRef([x.getFullText() ]) ;
      }
    
      if (TS.isStatement(x) || isBlockLike(x) )
      {
        (/** @satisfies {TS.Statement | TS.BlockLike} */ (x)) ;
        ;
        // TODO

        if (TS.isEmptyStatement(x) )
        {
          ;
          return byPlainSynchronousStatement([]) ;
        }
        
        if (TS.isExpressionStatement(x) )
        {
          ;
          // TODO
          return byPlainSynchronousStatement(["(expression)"]) ;
        }
        
        if (isBlockLike(x) )
        {
          (/** @satisfies {TS.BlockLike} */ (x)) ;
          ;

          const innerDeclHandler = (
            // TODO
            thisLvlDeclarationHandler
          );

          const emittedC = ["{", ...(
            x.statements
            .flatMap((nd) => (
              asyncifyAstImpl(nd, { declarationHandler: innerDeclHandler, asAssignmentTarget, } )
              .code
            ) )
          ), "}" ] ;
          return byPlainSynchronousStatement(emittedC) ;
          // TODO
        }
    
        if (TS.isVariableStatement(x) )
        {
          (/** @satisfies {TS.VariableStatement } */ (x)) ;

          // TODO
          const cs = (
            x.declarationList.declarations
            .map(c => asyncifyAstImpl(c, { declarationHandler: thisLvlDeclarationHandler, asAssignmentTarget, } ) )
          ) ;

          return (
            byPlainSynchronousStatement((
              cs.flatMap(c => {
                return (c.type === "Statement" ? c.code : throwTypeError() ) ;
              } )
            ) )
          ) ;
        }
      }

      ;
      if (TS.isVariableDeclaration(x) )
      {
        (/** @satisfies {TS.VariableDeclaration } */ (x)) ;

        const { name: nameToken } = x ;
        const name = (
          // nameToken.getFullText()
          // toBindingExpr(nameToken, (x) => thisLvlDeclarationHandler.enformat1({ name: x, }) )
          nameToken
        ) ;

        const rhs = x.initializer ;

        const rhsTransfmed = (
          rhs ?
          asyncifyAstImpl(rhs).code
          : ["Function.UNINITIALIZED_VAR"]
        ) ;

        const c = /** @satisfies {SpclObjCode } */ (
          (/** @return {SpclObjCode } */ () => {
            // if (thisLvlDeclarationHandler.obcDeclMode === "defineProperyOnto" )
            // {
            //   return [thisLvlDeclarationHandler.obcDeclTargetRef, "[", JSON.stringify(name) , "]", "=", ...rhsTransfmed ] ;
            // }
            
            // if (thisLvlDeclarationHandler.obcDeclMode === "declarationStatement" )
            // {
            //   return ["const", name, "=", ...rhsTransfmed ] ;
            // }

            return thisLvlDeclarationHandler.enformat1({ name, new: true, rhsCode: rhsTransfmed, }) ;

            return throwTypeError(`for ${JSON.stringify({ thisLvlDeclarationHandler, })  }`) ;
          })()
        ) ;

        return (
          byPlainSynchronousStatement(c.code )
        ) ;
  
        // TODO
      }

      if (asAssignmentTarget && TS.isBindingName(x) )
      {
        (/** @satisfies {TS.BindingName } */ (x)) ;

        ;
      }

      // if (TS.isSourceFile(x) )
      // {
      //   // return asyncifyAstImpl(x) ;
      // }
    
      // switch (x.kind) {
      //   case TS.SyntaxKind.SourceFile :
      //   case TS.SyntaxKind.Block :
      //     // asyncifyAstImpl ;
      //     return throwTypeError(`${x.kind }`) || "" ;
      //   default :
      //     return throwTypeError(`unsupported SyntaxKind, ${x.kind }`) ;
      // }
      return (1 && setTimeout(() => (console["error"](`please report to the dev team.`) , process.exit(108) ), 1 * 1000 ) , (
        throwTypeError(`unsupported SyntaxKind, ${getSyntaxKindString(x.kind ) }`)
      )) ;
    }
  ) ;
})() ;

export { asyncify } ;

export { asyncifyAst } ;




/**
 * {@link TS.BlockLike } . no corresponding `isYyy` helper exposed
 * 
 */
const isBlockLike = /** @type {(x: TS.Statement | TS.Node) => x is TS.BlockLike } */ (x) => (
  TS.isBlock(x) || TS.isModuleBlock(x) || TS.isSourceFile(x) || TS.isCaseOrDefaultClause(x)
) ;

const getSyntaxKindString = /** @param {TS.Node["kind"] } x */ (x) => {
  for (const enm of Object.entries(TS.SyntaxKind).filter(ent => !(ent[0].match(/^(First|Last)/g) ) ) )
  {
    if (enm[1] === x ) {
      return enm[0] ;
    }
  }
  return throwTypeError(JSON.stringify({ x })) ;
} ;




;

/**
 * specially-crafted string-token list
 * 
 * @typedef {readonly string[] } SpclStringTokenSeq
 * 
 */









