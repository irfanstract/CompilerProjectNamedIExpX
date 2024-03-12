



import { util, assert, } from "typexpe-commons/src/common_sv.mjs";

import { allocateRxPipe, } from "typexpe-commons/src/frp.mjs";

import {
  ProposedFeatures,
  createConnection,
  TextDocuments,
  // InitializeResult ,
  FileChangeType,
} from "vscode-languageserver/node.js";
import * as LSP from "vscode-languageserver/node.js";

import { TextDocument, } from "vscode-languageserver-textdocument";





(function () {
  const c = createConnection(ProposedFeatures.all);

  /** @type {{ _CCM ?: any ,  }= } */
  let configEngine ;
  /** @type {{ _DCM ?: any , readonly cap: ((LSP.InitializeResult["capabilities"] & {} )["workspace"] ) , readonly fileSyncType: (LSP.InitializeResult["capabilities"] & {} )["textDocumentSync"] }= } */
  let workspacingEngine ;
  /** @type {{ _ACM ?: any , readonly cap: ((LSP.InitializeResult["capabilities"] & {} )["completionProvider"] ) , readonly resolve: (x: LSP.TextDocumentPositionParams) => LSP.CompletionItem[] , }= } */
  let editorAutocompletionsEngine ;

  /** @typedef {{ _S ?: any, maxNumberOfProblems: number, }} XGlobalSettings */

  /**
   * {@link globalSettingsHld}
   */
  const globalSettingsHld = (
    allocateRxPipe(/** @type {(x: XGlobalSettings) => typeof x } */ x => x , {
      initialValue: { maxNumberOfProblems: 5, } ,
    } )
  ) ;

  c.onInitialize(e => {
    ;

    if (e.capabilities.workspace)
    {
      ;
      if (!!e.capabilities.workspace.configuration )
      {
        configEngine = {} ;
      }

      if (!!e.capabilities.workspace.workspaceFolders )
      {
        // TODO
        workspacingEngine = {
          fileSyncType: LSP.TextDocumentSyncKind.Incremental
          ,
          cap: {
            workspaceFolders: {
              supported: true ,
            } ,
          } ,
        } ;
      }
    }

    editorAutocompletionsEngine = {
      cap: {
        resolveProvider: true ,
      } ,
      resolve: (x) => {
        return [
          { label: "item_1", kind: LSP.CompletionItemKind.Text, documentation: `another item`, } ,
          { label: "item_2", kind: LSP.CompletionItemKind.Text, documentation: `another item`, } ,
        ] ;
      } ,
    } ;

    // TODO
    return /** @satisfies {LSP.InitializeResult } */ ({
      capabilities: {
        textDocumentSync: workspacingEngine?.fileSyncType ?? LSP.TextDocumentSyncKind.Incremental ,
        workspace: workspacingEngine?.cap ,
        completionProvider: editorAutocompletionsEngine.cap ,
      } ,
    }) ;
  }) ;

  c.onInitialized(e => {
    c.console.log(`underlying engine initialized`) ;

    if (!!workspacingEngine)
    {
      // TODO
      c.client.register(LSP.DidChangeConfigurationNotification.type , undefined ) ;
    }

  } ) ;

  c.onDidChangeConfiguration(evt => {
    c.console.log(`receiving evt 'onDidChangeConfiguration'`) ;

    {
      globalSettingsHld[0].update(s => (evt.settings ?? s ) ) ;
    }
  } ) ;

  const d = new TextDocuments(TextDocument) ;

  d.onDidChangeContent(evt => {
    c.console.log(`receiving event 'onDidChangeContent'`) ;
    
    {
      c.console.log(`running 'validateDocument()'`) ;
      validateDocument(evt.document ) ;
    }
  } ) ;

  const validateDocument = /** @satisfies {(x: TextDocument) => any } */ async (d) => {
    c.sendDiagnostics({
      uri: d.uri ,
      diagnostics: [
        {
          message: `failed to validate the document.`,
          range: { start: LSP.Position.create(1, 1), end: LSP.Position.create(3, 1), } ,
          severity: LSP.DiagnosticSeverity.Error ,
        } ,
        {
          message: `consider reviewing the language-config file.`,
          range: { start: LSP.Position.create(1, 1), end: LSP.Position.create(7, 1), } ,
          severity: LSP.DiagnosticSeverity.Warning ,
        } ,
      ] ,
    }) ;
  } ;

  c.onCompletion(evt => {
    c.console.log(`receiving autocompletion-list request`) ;

    if (editorAutocompletionsEngine)
    {
      c.console.log(`delegating to 'editorAutocompletionsEngine' 'resolve' method`) ;
      return editorAutocompletionsEngine.resolve(evt) ;
    }
  } ) ;
  c.onCompletionResolve(e => {
    return e ;
  } ) ;

  d.listen(c) ;

  c.listen() ;
} )() ;







