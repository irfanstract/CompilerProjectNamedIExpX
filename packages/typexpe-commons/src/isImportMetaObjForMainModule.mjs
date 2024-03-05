


import { throwTypeError, throwAssertionError } from './common_sv.mjs';




import { pathToFileURL, } from 'node:url' ;



const isMainModuleImportMeta = /** @type {(x: ImportMeta) => Boolean } */ (m) => (
  pathToFileURL(getProcessArgv1() ).href === m.url
) ;
 
export { isMainModuleImportMeta } ;



/** @satisfies {() => string } */
const getProcessArgv1 = () => (
  process.argv[1] ?? throwTypeError(JSON.stringify({ processArgv: process.argv }) )
) ;






