
import * as REPL from "node:repl" ;

import * as Path from "node:path" ;





import TYPEXPE from "typexpe-compiler-chain" ;





const runReadEvalLoop = /** @param {Parameters<typeof startReadEvalLoop> } args */ (...[options = {} ]) => {
  throw new Error(`TODO Interactive REPL`) ;
} ;

const startReadEvalLoop = /** @param {{ replHistoryFilePath?: String | false } } [options] */ (options = {} ) => {
  ;

  const {
    replHistoryFilePath = Path.join(process.cwd(), ".iexpx-repl-history" ),
  } = options ;

  console["log"]({
    replHistoryFilePath ,
  }) ;

  const server = REPL.start({
    eval: (code, ctx, filename, cb) => (
      spclEvalImpl({ code, ctx, filename, })
      .then(({ returnValue, }) => cb(null, returnValue), excp => cb(excp, null) )
    ) ,
  }) ;

  if (replHistoryFilePath) {
    server.setupHistory(replHistoryFilePath, (error, _) => (error ? console["warn"](error) : console["info"](`succesfully set-up the historyfile`, { path: replHistoryFilePath, } ) ) ) ;
  }
} ;

const spclEvalImpl = /** @type {(...args: (Parameters<REPL.ReplOptions["eval"]> extends [infer Cod, infer Ctx, infer FNm, ...infer etc] ? [{ code: Cod, ctx: Ctx, filename: FNm, }] : never ) ) => Promise<{ returnValue: any, }> } */ async ({ code, ctx, filename, }) => {
  ;
  console["info"](`evaluating code`, { code, } ) ;

  // throw new REPL.Recoverable(new TypeError(`TODO Interactive REPL`) ) ;
  // throw new Error(`TODO Interactive REPL`) ;
  const { returnValue, } = await (async () => {
    try {
      return (
        (console["log"]({ code, })  , await TYPEXPE.execAsync(code ) )
      ) ;
    } catch (z) {
      if (z instanceof TYPEXPE.NoCodeInSrcTextException ) {
        throw new REPL.Recoverable(z) ;
      }
      throw z ;
    }
  })() ;
  // TODO
  return {
    returnValue: returnValue ,
  } ;
} ;

export { runReadEvalLoop, startReadEvalLoop, } ;




// TODO
const bashReplImpl = /** @satisfies {(args: String[] ) => any } */ (args ) => {
  ;

  return (
    startReadEvalLoop()
  ) ;
} ;

export { bashReplImpl, } ;






