









/** @typedef {IOP_ALL_APPLIED_COMB<"@" | IRepeatedString2<Extract<SupportedOperatorTokenElement, SupportedOperatorTokenElement_NOMORETHATTWOTIMES > > | IRepeatedString3<Exclude<SupportedOperatorTokenElement, SupportedOperatorTokenElement_NOMORETHATTWOTIMES > > > } SupportedOperatorToken */
const SupportedOperatorToken = {} ;

/** @typedef {("=" | ":" | ("?" | "!") | ( "+" | "-" | "~") | ("<" | ">") | "%" | "*" | "&" | "^" | ("/" | "|" | "\\") ) } SupportedOperatorTokenElement */

/** @typedef {":" | "=" | "!" | "?" | "~" | "%" | "*" | "-" | "#" | "@" | SupportedOperatorTokenElement_LOGICALINFIXOPCHAR } SupportedOperatorTokenElement_NOMORETHATTWOTIMES */

/** @typedef {("&" | "^" | SupportedOperatorTokenElement_OR) } SupportedOperatorTokenElement_LOGICALINFIXOPCHAR */

/** @typedef {(("/" | "|" | "\\") ) } SupportedOperatorTokenElement_OR */

/**
 * @typedef {IOP_INPLACENESS<IOP_ALL_APPLIED_PURE<E> > } IOP_ALL_APPLIED_COMB
 * @template {string} E
 */

/**
 * @typedef {IOP_ASSOC_AND_OPTIONALITY<E> } IOP_ALL_APPLIED_PURE
 * @template {string} E
 */

/**
 * @typedef {`:${E}` | `${E}:` | `${E}` } IOP_ASSOC
 * @template {string} E
 */

/**
 * @typedef {`?${E}` | `${E}?` | `${E}` } IOP_OPTIONALITY
 * @template {string} E
 */

/**
 * @typedef {`${"?" | ""}${`:${E}` | `${E}` }` | `${`${E}:` | `${E}` }${"?" | "" }` } IOP_ASSOC_AND_OPTIONALITY
 * @template {string} E
 */

/**
 * @typedef {`${E}=` | `${E}` } IOP_INPLACENESS
 * @template {string} E
 */

// /**
//  * @typedef {`${E}` | `${E}${E}` } RepeatedString2
//  * @template {string} E
//  */

// /**
//  * @typedef {RepeatedString2<E> | `${E}${E}${E}` } RepeatedString3
//  * @template {string} E
//  */

// /**
//  * @typedef {RepeatedString3<E> | `${E}${E}${E}${E}` } RepeatedString4
//  * @template {string} E
//  */








export { SupportedOperatorToken, } ;











