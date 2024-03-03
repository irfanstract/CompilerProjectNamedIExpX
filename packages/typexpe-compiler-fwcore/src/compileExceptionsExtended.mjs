






export * from "./compileExceptions.mjs";



import { SyntaxError } from "./compileExceptions.mjs";

export { SyntaxError } ;


import { TypeError } from "./compileExceptions.mjs";

export { TypeError } ;


/**
 * 
 */
class PostCompiledCodeError extends TypeError {}

export { PostCompiledCodeError, } ;

/**
 * "there's nothing to run since the source-text doesn't contain anything but whitespace".
 * 
 */
class NoCodeInSrcTextException extends PostCompiledCodeError {}

export { NoCodeInSrcTextException, } ;




