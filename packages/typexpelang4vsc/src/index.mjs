
import { util } from "typexpe-commons/src/common_sv.mjs";



import Path from "node:path" ;

import {
  // ExtensionContext,
  workspace,
} from "vscode";
/** @typedef {import("vscode").ExtensionContext } ExtensionContext */

import {
  LanguageClient,
  // LanguageClientOptions,
  // ServerOptions,
  TransportKind,
} from "vscode-languageclient/node.js" ;
/** @typedef {import("vscode-languageclient/node.js").LanguageClientOptions } LanguageClientOptions */
/** @typedef {import("vscode-languageclient/node.js").ServerOptions } ServerOptions */





/** @type {LanguageClient } */
let client ;



export const activate = /** @satisfies {(x: ExtensionContext) => any } */ (context) => {
  ;

  // const md = Math.random().toString() ;

  // const dbgModeOnlyOptions = /** @satisfies {Extract<Exclude<ServerOptions, Function>, { run } >["debug"]["options"] } */ ({
  //   execArgv: ["--hosted-debug"] ,
  // }) ;

  // const serverOptions = /** @satisfies {Extract<Exclude<ServerOptions, Function>, { run } > } */ ({
  //   run: { module: md, transport: TransportKind.ipc } ,
  //   debug: { module: md, transport: TransportKind.ipc, options: dbgModeOnlyOptions, } ,
  // }) ;

  // const clientOptions = /** @satisfies {LanguageClientOptions } */ ({
  //   documentSelector: [
  //     { scheme: "file", language: "plaintext", } ,
  //   ] ,
  //   synchronize: {
  //     // fileEvents:
  //   } ,
  // }) ;

  // c ??= (
  //   new LanguageClient(util.throwTypeError() , serverOptions, { } )
  // ) ;
  
  {
    // The server is implemented in node
    let serverModule = context.asAbsolutePath(Path.join('server', 'out', 'server.js'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging

    const debugOptions = /** @satisfies {Extract<Exclude<ServerOptions, Function>, { run } >["debug"]["options"] } */ ({ execArgv: ['--nolazy', '--inspect=6009'] });

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions = /** @satisfies {Extract<Exclude<ServerOptions, Function>, { run } > } */ ({
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions
        }
    });

    // Options to control the language client
    let clientOptions = /** @satisfies {LanguageClientOptions } */ ({
        // Register the server for plain text documents
        documentSelector: [{ scheme: 'file', language: 'plaintext' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        }
    }) ;

    // Create the language client and start the client.
    client = new LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);

    // Start the client. This will also launch the server
    client.start();

  }
} ;




// see also:
// https://www.typescriptlang.org/play?#code/PTAEHUFMBsGMHsC2lQBd5oBYoCoE8AHSAZVgCcBLA1UABWgEM8BzM+AVwDsATAGiwoBnUENANQAd0gAjQRVSQAUCEmYKsTKGYUAbpGF4OY0BoadYKdJMoL+gzAzIoz3UNEiPOofEVKVqAHSKymAAmkYI7NCuqGqcANag8ABmIjQUXrFOKBJMggBcISGgoAC0oACCbvCwDKgU8JkY7p7ehCTkVDQS2E6gnPCxGcwmZqDSTgzxxWWVoASMFmgYkAAeRJTInN3ymj4d-jSCeNsMq-wuoPaOltigAKoASgAywhK7SbGQZIIz5VWCFzSeCrZagNYbChbHaxUDcCjJZLfSDbExIAgUdxkUBIursJzCFJtXydajBBCcQQ0MwAUVWDEQC0gADVHBQGNJ3KAALygABEAAkYNAMOB4GRonzFBTBPB3AERcwABS0+mM9ysygc9wASmCKhwzQ8ZC8iHFzmB7BoXzcZmY7AYzEg-Fg0HUiQ58D0Ii8fLpDKZgj5SWxfPADlQAHJhAA5SASPlBFQAeS+ZHegmdWkgR1QjgUrmkeFATjNOmGWH0KAQiGhwkuNok4uiIgMHGxCyYrA4PCCimSXFg9UalU4eCVOvyYjHoAA3iWc-ivABuUAAX0UqHaoAAkhUZ7yzMXl+TGlS52jtmtUPwCHVMPwm2R4oI7xZ+GueaPxzrQCeMgoZDJAwSzEN8ehkMm1ANJS4KrAoPDCHuM6zhuAHfMBSw4GQZivuKqAANIZK414otwSH7sWqHSmeNDYbhBD4URPBfpRE5-oo6FASBKDPHaDpOgAwm6KKoFBw6waRiG7pRc4bioroMIIwh8Zw9qOpAwkUKJcEIeR05UfJYADuYEmgKp6lCSJ2xKgEdmOMwBQGaAv7UYpynmfxGlaTp84yqgZDsEO4q2fZZCOVOR4uXJ67BO4NCutpqKRTOJ6KGlBp3JmZAQa2IjqpA0KQK4GT9PA3BKCU8VXOB3wALLlVEKC8hSCjwQESkVLIcpWpAtD3kqd6xAEABW8AZEq0a1WQkb8JGHBRnN2UQaNgiRjqOoniUmUoBV0jsCM8DQWeOLipWNU5d8ijbWApSlBkr6QEO3IAGwAAxvQAnFOgWwTay3fD6oAxuVkDRrulJEMF2JmhVVwYMyxCgIJoOjF4dR5hoYL-dNp3YntB3aGp11uDmcIyAd4kwcIvLzmsT0VOFOhTgA2pGd0DIwABeeCzaA7P3ZDT2oK9H2fZGAC665pTdu6pDaUlyCOoiMIO2AlV4BMjLDtwoudWsXblR0SfWfTsJm3AkymaYZrrJZcEkx2wTcoDm8VJPVQDkFO05YGXd7JtfrOJMlL9U7zrDTVTl7DXcE1-ABQx+FTvRkNMcRARULA668CH5P7cw4d5yUkfuNH02x-HxdoDhadkKgKe13h9fMdwmcELAuclN3jsm1OWtU2eecbiUa4y6AKY+2CrVsNA52MGpAnVtZqAe2TiWiYPlJThZS8+dsW803OecqI8kDaFSgM4-7ePzIwpVtTQ3A1OwdZ58-sCv6JYHuNDrPzoIDQhVIBTkjMkTEYN+AL0siA-mnZ0LwUjOuCWXdu7HHMJgNgnAKBc1gcHHussQb1GSMWa+uVPRWhxBAkwDg1L6DBJGAIG9thkGzuA9wwhWoMAyMVIGjZxQvjfJVAh7DIA0j0NsJyT5BE8SYZMBQAAxCBxA8CX0QOAOoQCyCTQAFQ6OAEwlerD1rDxJmPYIstBLyLttApeJgV7TlcFSfM51mGoCCCUNxX5ODxk8ovbyK8lR50jLYjSfsIL+gKrNYJu8NKgHCYDSJTJok9y9ofVBniV6HxJptCxE8wDEDzPXVxK8AjeDUG8TEc8GDQFlLaNW50vYkzcQEZx9cJwniAA
