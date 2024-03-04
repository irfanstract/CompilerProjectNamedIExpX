









# CONTRIBUTING for The IExpX Compiler Project




## Coding Conventions

indentations should be 2 spaces (char `0x20`, *SPACE*)

avoid using plain `.js` ext for JS files,
usually `import`s will be rejected in plain `.js`es, so
needs to rewrite (in)to `.cjs` or `.mjs`
(maybe not that much of an issue if they were (the needing extra compile-step, type-ascription-heavy superset ) TS instead )

`break` should always be labelled:
```javascript
/* avoid */
for (const segmt of segments )
{
  if (isG2DClosePathCmd(segmt) )
  { break ; }
}

/* OK */
LOOP_1:
for (const segmt of segments )
{
  if (isG2DClosePathCmd(segmt) )
  { break LOOP_1 ; }
}
```

avoid potential pit-falls in null-checking of `number`:
```javascript
({ height: heightArg, }) => {
  ;
  
  /* avoid these */
  if (heightArg) { return proceed({ height: heightArg, }) ; } /* wrong ; `0` would coerce to `false` */
  
  /* OK */
  if (heightArg?.toPrecision ) { return proceed({ height: heightArg, }) ; } /* OK ; `heightArg?.toPrecision` would only evaluate to non-null if (1) `heightArg` is non-null, and (2) `toPrecision` exists on it (necessarily the case if it's a ``number ) */

  ;
}

```









