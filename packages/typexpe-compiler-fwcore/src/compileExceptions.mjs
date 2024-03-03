











/**
 * *compile-exception*
 * 
 * effectively, this is a sequence :
 * 1) {@link SourceTreeMappingException *failure to fully iterate/list and map the specified src-tree* }
 * 2) {@link SyntaxError *there's a syntax error in code, we can't even build AST from it* }
 * 2) {@link TypeError *successfully built AST from the text, but type-checking failed* }
 * 
 */
class ParseAndCompileError extends globalThis.TypeError {}

export { ParseAndCompileError, } ;



/**
 * *an exception while
 * none of the resolved "src-file(s)" have gone thru parsing-stage*
 * 
 */
class SourceTreeMappingException extends ParseAndCompileError {}

export { SourceTreeMappingException, } ;



/**
 * *the compiler cannot succesfully parse the src-text*.
 * 
 */
class SyntaxError extends ParseAndCompileError {}

export { SyntaxError, } ;



/**
 * *the compiler successfully built AST from the src-text, but
 * type-checking or transformation of/on the AST failed*.
 * 
 */
class TypeError extends ParseAndCompileError {}

export { TypeError, } ;










