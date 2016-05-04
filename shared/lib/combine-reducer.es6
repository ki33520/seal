import Immutable from 'immutable';

// TODO need to find a way to reference Redux's init for compatability
const ActionTypes = { INIT: 'INIT' };
const isImmutable = (obj) => {
  return Immutable.Iterable.isIterable(obj);
};

/* eslint-disable no-console */

function getErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && `"${actionType.toString()}"` || 'an action';

  return (
    `Reducer "${key}" returned undefined handling ${actionName}. ` +
    `To ignore an action, you must explicitly return the previous state.`
  );
}

function verifyStateShape(initialState, currentState) {
  var reducerKeys = currentState.keySeq();

  if (reducerKeys.size === 0) {
    console.error(
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    );
    return;
  }

  if (!isImmutable(initialState)) {
    console.error(
      'initialState has unexpected type of "' +
      ({}).toString.call(initialState).match(/\s([a-z|A-Z]+)/)[1] +
      '". Expected initialState to be an instance of Immutable.Iterable with the following ' +
      `keys: "${reducerKeys.join('", "')}"`
    );
    return;
  }

  const unexpectedKeys = initialState.keySeq().filter(
   key => reducerKeys.indexOf(key) < 0
  );

  if (unexpectedKeys.size > 0) {
    console.error(
      `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
      `"${unexpectedKeys.join('", "')}" in initialState will be ignored. ` +
      `Expected to find one of the known reducer keys instead: "${reducerKeys.join('", "')}"`
    );
  }
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

export default function combineReducers(reducers) {
  reducers = isImmutable(reducers) ? reducers : Immutable.fromJS(reducers);
  const finalReducers = reducers.filter(v => typeof v === 'function');

  finalReducers.forEach((reducer, key) => {
    if (typeof reducer(undefined, { type: ActionTypes.INIT }) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined during initialization. ` +
        `If the state passed to the reducer is undefined, you must ` +
        `explicitly return the initial state. The initial state may ` +
        `not be undefined.`
      );
    }

    var type = Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type }) === 'undefined') {
      throw new Error(
        `Reducer "${key}" returned undefined when probed with a random type. ` +
        `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
        `namespace. They are considered private. Instead, you must return the ` +
        `current state for any unknown actions, unless it is undefined, ` +
        `in which case you must return the initial state, regardless of the ` +
        `action type. The initial state may not be undefined.`
      );
    }
  });

  var defaultState = finalReducers.map(r => undefined);
  var stateShapeVerified;

  return function combination(state = defaultState, action) {

    let finalState = state;
    finalReducers.forEach( ( reducer, key ) => {
      const oldState = state.get( key );
      const newState = reducer( oldState, action );

      if (typeof newState === 'undefined') {
        throw new Error(getErrorMessage(key, action));
      }

      finalState = finalState.set( key, newState );
    });

    if ((
      // Node-like CommonJS environments (Browserify, Webpack)
      typeof process !== 'undefined' &&
      typeof process.env !== 'undefined' &&
      process.env.NODE_ENV !== 'production'
    ) ||
      // React Native
      typeof __DEV__ !== 'undefined' &&
      __DEV__ // eslint-disable-line no-undef
    ) {
      if (!stateShapeVerified) {
        verifyStateShape(state, finalState);
        stateShapeVerified = true;
      }
    }

    return finalState;
  };
}