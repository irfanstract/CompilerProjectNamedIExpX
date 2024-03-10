













const allocateRxPipe1 = (
  /**
   * @template R0
   * @template [R1=R0]
   * @param {[...a: [initialMap: (x: R0) => R1, ] , options: { initialRawValue: R0, } ]} args
   * 
   */
  function (...[mapFunc1, { initialRawValue, }])
  {
    const [lhs, rhs0] = (
      allocateRxPipe(/** @type {(x: R0) => R0 } */ x => x , { initialValue: initialRawValue, })
    ) ;
    return /** @satisfies {[any, any]} */ ([lhs, rhs0.map(mapFunc1) ]) ;
  }
) ;

const allocateRxPipe = (
  /**
   * @template R0
   * @param {[...a: [typingFunc: (x: R0) => R0 ] , options: { initialValue: R0, } ]} args
   * @returns {[{ setTo: (x: R0) => void, update: (x: (x: R0) => R0 ) => void, }, XRxThenningOps<R0> ] }
   * 
   */
  function allocateRxPipeImpl(...[typingFunc , { initialValue: initialRawValue, }])
  {
    ;

    const {
      fireAllListenersUnconditionally ,
      removeAllListeners ,
      runAssigmentEffect ,
      getLastAssignedRawValue ,

      listenerList ,
    } = allocateRxPipeResource1(typingFunc, { initialValue: initialRawValue, } ) ;

    const getLatterSideItc1 = (
      /**
       * 
       * @template R1
       * @param {[options: { mapping: (x: R0) => R1, } ]} args
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

          const mapFuncTot = /** @satisfies {(x: R0) => any } */ (x0) => { const x1 = mapFunc1(x0) ; return mapFunc2(x1) ; } ;

          const i = getLatterSideItc1Impl({ mapping: mapFuncTot, } ) ;

          return i ;
        } ;

        /**
         * implements {@link XRxThenningOps.then the `then` method }.
         * 
         */
        const getPreSubscribedMappedDerivativeI = /** @satisfies {XRxThenningOps<R1>["then"] } */ (mapFunc2) => {

          const mapFuncTot = /** @satisfies {(x: R0) => any } */ (x0) => { const x1 = mapFunc1(x0) ; return mapFunc2(x1) ; } ;

          return (
            allocCopykeepingLatterNode({
              mapFuncTot,
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
       * @param {[{ mapFuncTot: (x: R0) => R2, shallMakeInitialDispatch: boolean, immediateRegister?: boolean, }]} args
       * 
       */
      (...[{ mapFuncTot, shallMakeInitialDispatch, immediateRegister = true, } ,]) => {
        ;

        ;
        const key = Symbol(`listener`) ;
        ;

        //
        const al2 = (
          allocateRxPipe(/** @type {(x: ReturnType<typeof mapFuncTot>) => (typeof x)} */ x => x , {
            initialValue: mapFuncTot(getLastAssignedRawValue() )
            ,
          } )
        ) ;
  
        const callWithMappedValue = /** @satisfies {(x: R0) => any } */ (x0) => {
          const x2 = mapFuncTot(x0) ;
          al2[0].setTo(x2) ;
        } ;
  
        const register = () => {
          listenerList.set(key, callWithMappedValue ) ;
        } ;
        const unregister = () => {
          // TODO
          listenerList.delete(key) ;
        } ;
  
        C:
        {
          if (shallMakeInitialDispatch)
          {
            const vle = getLastAssignedRawValue() ;
  
            try {
              ;
              /**
               * immediately run the listener.
               * 
               */
              callWithMappedValue(vle ) ;
            } catch (z) {
              ;
              console["error"](`exception thrown by newly-added listener with key ${String(key) }`) ;
              console["error"](z) ;
              console["error"](`canceling this one subscription`) ;
              break C ;
            }
          }
    
          immediateRegister && register() ;
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

    return [{
      setTo: (newRawVal) => runAssigmentEffect(newRawVal)
      ,
      update: (newVFnc) => {
        const newRawVal = newVFnc(getLastAssignedRawValue() ) ;
        return runAssigmentEffect(newRawVal ) ;
      } ,
    }, getLatterSideItc1({ mapping: x => x, } )] ;
  }
) ;

export { allocateRxPipe, allocateRxPipe1, } ;

const allocateRxPipeResource1 = (
  /**
   * @template R0
   * @param {[...a: [typingFunc: (x: R0) => R0 ] , options: { initialValue: R0, } ]} args
   * 
   */
  function (...[, { initialValue, }])
  {
    /** @type {R0 } */
    let lastAssignedRawValue = initialValue ;

    const listenerList = /** @type {Map<Symbol, (x: R0) => void > } */ (new Map()) ;

    /** @type {boolean} */
    let clearAllListenersOnListenerThrownException = false ;

    /**
     * run all listeners, unconditionally
     * 
     */
    const fireAllListenersUnconditionally = /** @param {[options: { runOnListenerThrownExceptionAction: (...args: [x: any, options: { key: Parameters<(typeof listenerList)["get"] >[0] , } ] ) => void } ]} args */ (...[{ runOnListenerThrownExceptionAction, }]) => {
      ;
      for (const [k, l] of listenerList.entries() )
      { try { l(lastAssignedRawValue) ; } catch (z) { runOnListenerThrownExceptionAction(z, { key: k, } ) ; } }
    } ;

    const removeAllListeners = () => { listenerList.clear() ; } ;

    const runAssigmentEffect = /** @satisfies {(x: R0) => any } */ (newV0) => {
      lastAssignedRawValue = newV0 ;

      fireAllListenersUnconditionally({

        runOnListenerThrownExceptionAction: (evt, { key, } ) => {
          clearAllListenersOnListenerThrownException && removeAllListeners() ;
    
          // throw z ;
          {
            console["error"](`exception thrown by the listener with key ${String(key) }`) ;
            console["error"](evt) ;
            console["error"](`removing the listener with key ${String(key) }`) ;
            listenerList.delete(key) ;
          }
        } ,

      }) ;
    } ;

    const getLastAssignedRawValue = () => (
      lastAssignedRawValue
    ) ;

    return {
      fireAllListenersUnconditionally ,
      removeAllListeners ,
      runAssigmentEffect ,
      getLastAssignedRawValue ,

      // TODO get rid of this
      /** @deprecated */
      listenerList ,
    } ;
  }
) ;



/**
 * defines the relevant ops ; eg `map` and `then`
 * 
 * `then` is basically `map` plus a `close()`ible subscription.
 * 
 * @typedef {{ map: <R2>(...a: [(x: R) => R2] ) => XRxThenningOps<R2>; then: <R2>(...a: [(x: R) => R2] ) => XRxThenningOps<R2> & { close(): void ; } }} XRxThenningOps
 * @template R
 * 
 */














