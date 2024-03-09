

import { reiterable } from 'typexpe-commons/src/common_sv1.mjs';

import { pathToFileURL, } from 'node:url' ;

import { isMainModuleImportMeta } from 'typexpe-commons/src/isImportMetaObjForMainModule.mjs';

import { bashMainImpl } from './src/cli-main.mjs';

import { startReadEvalLoop, runReadEvalLoop, } from './src/cli-repl.mjs';






// TODO
if ((
  /* whether this is being run as the main module */
  isMainModuleImportMeta(import.meta )
)) {
  ;
  console.warn(`'typexpe-cli' invoked as main module`) ;
  0 && console.warn(`['typexpe-cli'] evaluating 'startReadEvalLoop()'`) ;
  ;
  bashMainImpl(process.argv.slice(2) ) ;
}
else {
  ;
  console.info(`'typexpe-cli' imported as regular package`) ;
}








