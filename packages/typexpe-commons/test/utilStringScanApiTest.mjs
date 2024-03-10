

import assert from "assert";

import { expectHead } from "typexpe-commons/src/stringHeadMatch.mjs"; 





describe("String Scan API Test", () => {
  ;

  it(`shall behave as intended`, () => {
    {
      const m1 = expectHead("()&&", /\(\)/) ;
      assert(m1) ;
      assert.strictEqual(m1.matchedString, "()" ) ;
      assert.strictEqual(m1.remainder, "&&" ) ;
    }
    {
      const m1 = expectHead("&&&()&&", /\(\)/) ;
      assert(m1 === false ) ;
      assert(m1 === false ) ;
    }
    {
      const m1 = expectHead("&&&()&&", /\)/) ;
      assert(m1 === false ) ;
      assert(m1 === false ) ;
    }
    {
      const m1 = expectHead("&&&():&&&", /\&\&\&\(\)/) ;
      assert(m1) ;
      assert.strictEqual(m1.matchedString, "&&&()" ) ;
      assert.strictEqual(m1.remainder, ":&&&" ) ;
    }
    // {
    //   const m1 = expectFromHead("&&&()&&", /\(\)/) ;
    //   assert(m1) ;
    //   assert.strictEqual(m1.matchedString, "()" ) ;
    //   assert.strictEqual(m1.beforeMatchedString, "&&&" ) ;
    //   assert.strictEqual(m1.remainder, "&&" ) ;
    // }
    // {
    //   const m1 = expectFromHead("&&&()&&", /\&\(/) ;
    //   assert(m1) ;
    //   assert.strictEqual(m1.matchedString, "&(" ) ;
    //   assert.strictEqual(m1.beforeMatchedString, "&&" ) ;
    //   assert.strictEqual(m1.remainder, ")&&" ) ;
    // }
  } ) ;

} ) ;




