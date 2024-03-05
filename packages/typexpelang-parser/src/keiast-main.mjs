












export class KsStatement {
  KST_NO_STRUCTURAL() {}
}

export class KsStatementList
{
  constructor()
  {
    /** @type {readonly KsStatement[] } */
    this.children ;
  }
}

export class KsImperativeCurlyBraceDelimitedGroup extends KsStatement
{
  constructor()
  {
    super() ;
    /** @type {KsStatementList } */
    this.stmts ;
  }
}




export class KsTermRef {
  KTERMQUE_IS_NOMINAL() {}
}

export class KsLiteral extends KsTermRef
{
  constructor()
  {
    super() ;
    /** @type {string } */
    this.srcText ;
  }
  KLiteral_is_nominal() {}
}

export class KsVoidAgaistLiteral extends KsTermRef
{
  constructor()
  {
    super() ;
    /** @type {KsTermRef } */
    this.main ;
  }
  KVoidAgainst_NO_STRUCTURAL() {}
}








