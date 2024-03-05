












export class KeStatement {
  KST_NO_STRUCTURAL() {}
}

/**
 * 
 * @private
 * 
 */
class KeAbstractInfixOpAlikeSystem extends KeStatement
{
  //
  constructor()
  {
    super() ;
    /** @type {readonly SupportedInfixOperand[] } */
    this.constituents ;
    /** @type {string } */
    this.operator ;
    /** @type {SupportedInfixOperand } */
    this.product ;
  }
}

export class KeCommutativeOpSystem extends KeAbstractInfixOpAlikeSystem
{
  constructor()
  {
    super() ;
    /** @type {readonly SupportedInfixOperand[] } */
    this.constituents ;
    /** @type {KeSupportedCommutativeInfixOp } */
    this.operator ;
    /** @type {SupportedInfixOperand } */
    this.product ;
  }
}

export class KeAsymmetricOpSystem extends KeAbstractInfixOpAlikeSystem
{
  //
  constructor()
  {
    super() ;
    /** @type {readonly [SupportedInfixOperand, SupportedInfixOperand] } */
    this.constituents ;
    /** @type {SupportedOperatorToken } */
    this.operator ;
    /** @type {SupportedInfixOperand } */
    this.product ;
  }
}

/** @typedef {KeLocalVariableRef | KeTermRef } SupportedInfixOperand */

/**
 * @enum {string & { _t ?: any } }
 */
export const KeSupportedCommutativeInfixOp = /** @type {const} */ ({
  ADDITION: "+" ,
  MULTIPLICATION: "*",
  CONSTITUENTAL_UNION: "c_|" ,
  CONSTITUENTAL_INTERSECTION: "c_&" ,
}) ;

import {
  // @ts-ignore
  SupportedOperatorToken ,
} from "./keiasm-operators.mjs";




class KeLocalVariableRef {
  KeLocalVariableRef_is_nominal() {}
}

;




export class KeTermRef {
  KTERMQUE_IS_NOMINAL() {}
}

export class KeLiteral extends KeTermRef
{
  constructor()
  {
    super() ;
    /** @type {string } */
    this.srcText ;
  }
  KLiteral_is_nominal() {}
}








