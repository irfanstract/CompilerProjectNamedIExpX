












export class KeStatement {
  KST_NO_STRUCTURAL() {}
}

export class KeAdditiveInterSystem extends KeStatement
{
  constructor()
  {
    super() ;
    /** @type {readonly (KeLocalVariableRef | KeTermRef )[] } */
    this.constituents ;
    /** @type {KeSupportedCollectiveOp } */
    this.operator ;
    /** @type {KeLocalVariableRef } */
    this.product ;
  }
}

/**
 * @enum {string & { _t ?: any } }
 */
export const KeSupportedCollectiveOp = /** @type {const} */ ({
  ADDITION: "+" ,
  MULTIPLICATION: "*",
  CONSTITUENTAL_UNION: "c_|" ,
  CONSTITUENTAL_INTERSECTION: "c_&" ,
}) ;




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








