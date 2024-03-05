

import { pathToFileURL, } from 'node:url' ;

import { isMainModuleImportMeta } from 'typexpe-commons/src/isImportMetaObjForMainModule.mjs';

import { startReadEvalLoop, runReadEvalLoop, } from './src/cli-repl.mjs';






// TODO
if ((
  /* whether this is being run as the main module */
  isMainModuleImportMeta(import.meta )
)) {
  ;
  console.warn(`'typexpe-cli' invoked as main module`) ;
  console.warn(`['typexpe-cli'] evaluating 'startReadEvalLoop()'`) ;
  ;
  startReadEvalLoop() ;
}
else {
  ;
  console.info(`'typexpe-cli' imported as regular package`) ;
}








