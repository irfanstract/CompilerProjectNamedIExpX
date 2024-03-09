

import { util ,reiterable, iterateNonNull } from 'typexpe-commons/src/common_sv.mjs';







/**
 * @typedef {{ readonly mainTokens: String[], readonly configTokens: String[] } } MainTokensAndConfigTokens
 * 
 */
;




/**
 * classify the __leading__ __consecutive sequence__ of {@link String.match hyphen-prefixed} items, as `configTokens`, and
 * classify the rest, as `mainTokens` ;
 * 
 * classify the __leading__ __consecutive sequence__ of {@link String.match hyphen-prefixed} items, as `configTokens`, and
 * classify the rest, as `mainTokens` ;
 * parsing
 * stops when encountering the first "nonprefixed items",
 * treating further "prefixed items" as {@link MainTokensAndConfigTokens.mainTokens "part of regular args"}
 * 
 * this way:
 * ```
 * > ["--debug", "repl", "--linesep=LF" ]
 * {
 *   configTokens: ["--debug" ],
 *   mainTokens: ["repl", "--linesep=LF", ],
 * }
 * 
 * > ["repl", "--linesep=LF", "--suppress-ansibellchars" ]
 * {
 *   configTokens: [],
 *   mainTokens: ["repl", "--linesep=LF", "--suppress-ansibellchars", ],
 * }
 * 
 * > ["--debug", "run", "--linesep=LF", "--suppress-ansibellchars", "graphical-notebook", "--contents-autoplay" ]
 * {
 *   configTokens: ["--debug", ],
 *   mainTokens: ["run", "--linesep=LF", "--suppress-ansibellchars", "graphical-notebook", "--contents-autoplay", ],
 * }
 * 
 * > ["--debug", "--verbose", "repl", "--linesep=LF", "--suppress-ansibellchars" ]
 * {
 *   configTokens: ["--debug", "--verbose", ],
 *   mainTokens: ["repl", "--linesep=LF", "--suppress-ansibellchars", ],
 * }
 * 
 * > ["--debug", "--", "--verbose", "repl", ]
 * {
 *   configTokens: ["--debug", "--", ],
 *   mainTokens: ["--verbose", "repl", ],
 * }
 * 
 * ```
 * 
 */
const bashExtractLeadingHyphensPrefixedNItems = /** @type {(c: String[]) => MainTokensAndConfigTokens } */ function bashExtractPreFlagsImpl(x) {
  const prelutN = (() => {
    let i=0 ;
    LOOP :
    for (; i<x.length; ++i )
    {
      const item = x[i] ?? util.throwAssertionError() ;

      if ((
        /** by convention, `--`s shall mark end of *options* */
        !(item.replace(HYPHEN_ONLY_STRINGS, () => NOMOREARGS ) === NOMOREARGS )
        &&
        /** whether starts with hyphen */
        !!item.match(PREFIXED_WITH_HYPHEN_R )
      ) ) { continue LOOP ; }
      else { break LOOP ; }
    }
    return i ;
  } )() ;

  return {
    mainTokens: x.slice(prelutN) ,
    configTokens: x.slice(0, prelutN ) ,
  } ;
} ;

const PREFIXED_WITH_HYPHEN_R = /^\-+(.*)$/ ;

const HYPHEN_ONLY_STRINGS = /^\-\-+$/ ;

const NOMOREARGS = ("--no-more-args") ;

export { bashExtractLeadingHyphensPrefixedNItems, } ;



/**
 * appropriately translates *args* into {@link MainTokensAndConfigTokens `configTokens` and `mainTokens` }
 * 
 */
const bashExtractPreFlags = /** @satisfies {(c: String[]) => MainTokensAndConfigTokens } */ (x) => (
  bashExtractLeadingHyphensPrefixedNItems(x)
) ;

export { bashExtractPreFlags, } ;







