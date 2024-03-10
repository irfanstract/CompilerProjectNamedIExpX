




import {
  ProposedFeatures,
  createConnection,
  TextDocuments,
  // InitializeResult ,
} from "vscode-languageserver/node.js";
import * as LSP from "vscode-languageserver/node.js";

import { TextDocument, } from "vscode-languageserver-textdocument";





(function () {
  const c = createConnection(ProposedFeatures.all);

  /** @type {{ _CCM ?: any }= } */ let configEngine ;
  /** @type {{ _DCM ?: any }= } */ let workspacingEngine ;
  /** @type {{ _ACM ?: any }= } */ let completionsEngine ;

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
        workspacingEngine = {} ;
      }
    }

    // TODO
    return /** @satisfies {LSP.InitializeResult } */ ({
      capabilities: {
        workspace: {
          workspaceFolders: {
            supported: !!workspacingEngine ,
          } ,
        } ,
        completionProvider: {
          resolveProvider: true ,
        } ,
      } ,
    }) ;
  }) ;

  c.onInitialized(e => {
    if (!!workspacingEngine)
    {
      // TODO
    }
  } ) ;

  const d = new TextDocuments(TextDocument) ;

  d.listen(c) ;

  c.listen() ;
} )() ;







