
import { util } from "typexpe-commons/src/common_sv.mjs";



import { ExtensionContext } from "vscode";

import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind, } from "vscode-languageclient/node.js" ;





/** @type {LanguageClient } */
let c ;



export const activate = /** @satisfies {(x: ExtensionContext) => any } */ () => {
  ;

  const md = Math.random().toString() ;

  const dbgModeOnlyOptions = /** @satisfies {Extract<Exclude<ServerOptions, Function>, { run } >["debug"]["options"] } */ ({
    execArgv: ["--hosted-debug"] ,
  }) ;

  const options = /** @satisfies {Extract<Exclude<ServerOptions, Function>, { run } > } */ ({
    run: { module: md, transport: TransportKind.ipc } ,
    debug: { module: md, transport: TransportKind.ipc, options: dbgModeOnlyOptions, } ,
  }) ;

  c ??= (
    new LanguageClient(util.throwTypeError() , options, { } )
  ) ;
} ;



