

import { pathToFileURL, } from 'node:url' ;

import { startReadEvalLoop, runReadEvalLoop, } from './src/cli-repl.mjs';






// TODO
if ((
  /* whether this is being run as the main module */
  pathToFileURL(process.argv[1]).href === import.meta.url
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








