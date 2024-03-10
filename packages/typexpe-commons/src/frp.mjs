













const allocateRxPipe1 = (
  /**
   * @template R0
   * @template [R1=R0]
   * @param {[...a: [initialMap: (x: R0) => R1, ] , options: { initialRawValue: R0, } ]} args
   * @returns {[(x: R0) => void, XRxThenningOps<R1> ] }
   * 
   */
  function (...[mapFunc1, { initialRawValue, }])
  {
    const [lhs, rhs0] = (
      allocateRxPipe(/** @type {(x: R0) => R0 } */ x => x , { initialValue: initialRawValue, })
    ) ;
    return [lhs, rhs0.map(mapFunc1) ] ;
  }
) ;

const allocateRxPipe = (
  /**
   * @template R0
   * @param {[...a: [typingFunc: (x: R0) => R0 ] , options: { initialValue: R0, } ]} args
   * @returns {[(x: R0) => void, XRxThenningOps<R0> ] }
   * 
   */
  function allocateRxPipeImpl(...[ , { initialValue: initialRawValue, }])
  {
    /** @type {R0 } */
    let lastAssignedRawValue = initialRawValue ;

    const listenerList = /** @type {Map<Object | Symbol, (x: R0) => void > } */ (new Map()) ;

    const removeAllListeners = () => { listenerList.clear() ; } ;

    const getLatterSideItc1 = (
      /**
       * 
       * @template R1
       * @param {[{ mapping: (x: R0) => R1, } ]} args
       * @returns {XRxThenningOps<R1> }
       */
      function getLatterSideItc1Impl(...[{ mapping: mapFunc1, }] )
      {
        ;

        /**
         * implements {@link XRxThenningOps.map the `map` method }.
         * 
         */
        const getDeferredMappedDerivativeI = /** @satisfies {XRxThenningOps<R1>["map"] } */ (mapFunc2) => {

          const mapFUncTot = /** @satisfies {(x: R0) => any } */ (x0) => { const x1 = mapFunc1(x0) ; return mapFunc2(x1) ; } ;

          const i = getLatterSideItc1Impl({ mapping: mapFUncTot, } ) ;

          return i ;
        } ;

        /**
         * implements {@link XRxThenningOps.then the `then` method }.
         * 
         */
        const getPreSubscribedMappedDerivativeI = /** @satisfies {XRxThenningOps<R1>["then"] } */ (mapFunc2) => {

          const mapFUncTot = /** @satisfies {(x: R0) => any } */ (x0) => { const x1 = mapFunc1(x0) ; return mapFunc2(x1) ; } ;

          return (
            allocCopykeepingLatterNode({
              mapFUncTot,
              shallMakeInitialDispatch: true,
              immediateRegister: true ,
            })
          ) ;
        } ;
        
        ;
        const latterSideOps = /** @satisfies {XRxThenningOps<R1> } */ ({
          //
          map: (mapFunc2) => (
            getDeferredMappedDerivativeI(mapFunc2)
          ) ,
          then: (mapFunc2) => (
            getPreSubscribedMappedDerivativeI(mapFunc2)
          ) ,
        }) ;
    
        ;
        return latterSideOps ;
      }
    ) ;

    const allocCopykeepingLatterNode = (
      /**
       * 
       * 
       * @template R2
       * @param {[{ mapFUncTot: (x: R0) => R2, shallMakeInitialDispatch: boolean, immediateRegister?: boolean, }]} args
       * 
       */
      (...[{ mapFUncTot, shallMakeInitialDispatch, immediateRegister = true, } ,]) => {
        ;

        //
        const al2 = allocateRxPipe(/** @type {(x: ReturnType<typeof mapFUncTot>) => (typeof x)} */ x => x , { initialValue: mapFUncTot(lastAssignedRawValue) } ) ;
  
        const callWithMappedValue = /** @satisfies {(x: R0) => any } */ (x0) => {
          const x2 = mapFUncTot(x0) ;
          al2[0].call(null, x2 ) ;
        } ;
  
        ;
        const tag = Symbol() ;
        ;

        const register = () => {
          listenerList.set(tag, callWithMappedValue )
        } ;
        const unregister = () => {
          // TODO
          listenerList.delete(tag) ;
        } ;
  
        immediateRegister && register() ;
  
        if (shallMakeInitialDispatch)
        {
          /**
           * immediately run the listener.
           * 
           */
          callWithMappedValue(lastAssignedRawValue) ;
        }
  
        return {
          // ...regularEnmapReturnedItc ,
          map : al2[1].map ,
          then: al2[1].then ,
          close: () => {
            unregister() ;
          } ,
        } ;
      }
    ) ;

    return [(newV0) => {
      lastAssignedRawValue = newV0 ;
      for (const [k, l] of listenerList.entries() )
      { try { l(lastAssignedRawValue) ; } catch (z) { 0 && removeAllListeners() ; throw z ; } }
    }, getLatterSideItc1({ mapping: x => x, } )] ;
  }
) ;

export { allocateRxPipe, allocateRxPipe1, } ;



/**
 * defines the relevant ops ; eg `map` and `then`
 * 
 * `then` is basically `map` plus a `close()`ible subscription.
 * 
 * @typedef {{ map: <R2>(...a: [(x: R) => R2] ) => XRxThenningOps<R2>; then: <R2>(...a: [(x: R) => R2] ) => XRxThenningOps<R2> & { close(): void ; } }} XRxThenningOps
 * @template R
 * 
 */














