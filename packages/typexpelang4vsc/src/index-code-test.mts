
import { NodeModule, } from "vscode-languageclient/node.js";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node.js" ;







let client: LanguageClient | undefined ;



export const activate = (context : import("vscode").ExtensionContext ) => {
  ;

  {
    ;
    
    // Options to control the language client
    let clientOptions: Exclude<LanguageClientOptions, Function> = ({
    }) ;

    // The server is implemented in node
    let serverModule = (() => {
      const path = (
        "no path"
      ) ;
      // The debug options for the server
      // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
      return {
        run  : { module: path, args: [], transport: TransportKind.ipc, options: { execArgv: [ ], }, } ,
        debug: { module: path, args: [], transport: TransportKind.ipc, options: { execArgv: ['--nolazy', '--inspect=6009', ], }, } ,
      } satisfies { [k in keyof { run: 1, debug: 1, } ]: NodeModule } ;
    })() ;

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions: Extract<Exclude<ServerOptions, Function>, { run: any, } > = ({
        run  : serverModule.run   ,
        debug: serverModule.debug ,
    });

    // Create the language client and start the client.
    client = new LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);

    // Start the client.
    // This will also launch the server
    client.start();

  }
} ;




