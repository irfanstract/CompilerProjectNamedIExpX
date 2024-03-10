
import assert from "assert";

import { allocateRxPipe, } from "typexpe-commons/src/frp.mjs";








describe(`the FRP/RX lib test`, () => {
  ;

  it(`shall make the '${allocateRxPipe.name }'-generated Pipe(s) behave as intended when there'd be no run-time exceptions`, () => {
    ;

    {
      const p = allocateRxPipe(/** @type {(x: Number) => (typeof x)} */ x => x , { initialValue: 5, } ) ;
      /** @type {number } */ let collectedValue = Number.NaN ;
      p[1].then(newVal => { collectedValue = newVal ; } ) ;

      assert.strictEqual(collectedValue, 5 ) ;
      p[0].setTo(1) ;
      assert.strictEqual(collectedValue, 1 ) ;
      p[0].setTo(2) ;
      assert.strictEqual(collectedValue, 2 ) ;
      p[0].setTo(3) ;
      assert.strictEqual(collectedValue, 3 ) ;
    }
    
    {
      const p = allocateRxPipe(/** @type {(x: Number) => (typeof x)} */ x => x , { initialValue: 5, } ) ;
      /** @type {number } */ let collectedValue = Number.NaN ;
      p[1].then(newVal => { collectedValue = newVal ; } ) ;

      assert.strictEqual(collectedValue, 5 ) ;
      p[0].update(x => (x + 1) ) ;
      assert.strictEqual(collectedValue, 6 ) ;
      p[0].update(x => (x + 2) ) ;
      assert.strictEqual(collectedValue, 8 ) ;
      p[0].update(x => (x + 3) ) ;
      assert.strictEqual(collectedValue, 11 ) ;
    }
    
    {
      const p = allocateRxPipe(/** @type {(x: Number) => (typeof x)} */ x => x , { initialValue: 5, } ) ;
      /** @type {number } */ let collectedValue = 777 ;
      p[1].map(newVal => { collectedValue = newVal ; return void 0 ; } ) ;

      assert.strictEqual(collectedValue, 777 ) ;
      p[0].setTo(1) ;
      assert.strictEqual(collectedValue, 777 ) ;
      p[0].setTo(2) ;
      assert.strictEqual(collectedValue, 777 ) ;
      p[0].setTo(3) ;
      assert.strictEqual(collectedValue, 777 ) ;
    }
    
  } ) ;

  it(`shall make the '${allocateRxPipe.name }'-generated Pipe(s) return normally even if a callback throws`, () => {
    ;

    {
      const p = allocateRxPipe(/** @type {(x: String) => (typeof x)} */ x => x , { initialValue: "5", } ) ;

      /** @type {string} */ let collectedValue = "???" ;

      p[1].then(newVal => { collectedValue = newVal ; } ) ;
      
      assert.deepStrictEqual(collectedValue, "5" ) ;

      {
        p[1].then(newVal => {
          assert.deepStrictEqual(newVal, "5") ;
        } ) ;
      }

      p[0].setTo(`some value 0`) ;      
      assert.deepStrictEqual(collectedValue, `some value 0` ) ;

      p[0].setTo(`some value 1`) ;
      assert.deepStrictEqual(collectedValue, `some value 1` ) ;

    }
  } ) ;
  
  it(`shall leave the '${allocateRxPipe.name }'-generated Pipe(s) self-consistent even if a callback throws`, () => {
    ;

    {
      const p = allocateRxPipe(/** @type {(x: String) => (typeof x)} */ x => x , { initialValue: "5", } ) ;

      /** @type {string} */ let v1 = "???" ;
      p[1].then(newVal => { v1 = newVal ; } ) ;
      
      assert.deepStrictEqual(v1, "5" ) ;

      {
        let expectedException ;
        TRY :
        try {
          p[1].then(newVal => {
            throw (expectedException = new TypeError(`illegal invocation`)) ;
          } ) ;
        } catch (z) {
          if (z === expectedException ) { console["info"](z) ; break TRY ; }
          throw z ;
        }
      }

      p[0].setTo(`some value 0`) ;      
      assert.deepStrictEqual(v1, `some value 0` ) ;

      p[0].setTo(`some value 1`) ;
      assert.deepStrictEqual(v1, `some value 1` ) ;
      
      /** @type {string} */ let v2 = "???" ;
      p[1].then(newVal => { v2 = newVal ; } ) ;

      p[0].setTo(`some value 2`) ;
      assert.deepStrictEqual(v2, `some value 2` ) ;
      assert.deepStrictEqual(v1, `some value 2` ) ;
      

    }
  } ) ;
  
  ;
} ) ;






