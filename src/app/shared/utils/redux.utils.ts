import { Action } from '@ngrx/store';
import * as _ from 'lodash';

/*
 * Action with payload type of <code>T</code>
 */
export interface ActionWithPayload<T> extends Action {
  payload: T;
}

/**
 * Create a new action object with supplied type.
 * Optionally takes a payload of type <code>T</code> and will add it to the action.
 */
export function createTypedAction<T>(type, payload?: T): ActionWithPayload<T> {
  'use strict';

  return {type, payload};
}


/**
 * recursively merges the source objects into the destination, creating new references for every object and array;
 * relies on lodash's mergewith();
 * currently does not "merge" arrays. Creates a new reference for source arrays and overrides destination arrays;
 * when a src property is null, this method will delete the corresponding destination property
 */
export function deepCloneMerge(...args: any[]) {
  'use strict';

  // get the destination and source objects, and wrap them in another object layer.
  // this is done because the very top layer of the objects do not get run through custom merge, and we need to access those
  const destinationObj = {content: args[0]};
  const sources = _.map(_.drop(args), (source) => {
    return {content: source};
  });

  // define custom merge function
  const customMerge = (objValue, srcValue) => {
    'use strict';

    // if the source object is an Array or a Map
    if (_.isArray(srcValue) || _.isMap(srcValue)) {
      // if the src array/map === the destination array/map, get a new array/map reference of source array/map and overwrite
      // destination array/map
      if (srcValue === objValue) {
        return _.clone(srcValue);
      } else { // otherwise just return the srcValue, since it is already a new reference
        return srcValue;
      }
    } else if (_.isObject(srcValue)) {
      const nullSrcProps = _.keys(_.pickBy(srcValue, _.isNull)); // check for nullSrcProps, which will delete corresponding fields

      // if we find any null fields, we need to do work to remove them
      if (nullSrcProps.length) {

        // if we are merging an object into an array, remove the null props and get a new array reference
        if (_.isArray(objValue)) {
          srcValue = _.omit(srcValue, nullSrcProps);
          _.pullAt(objValue, _.map(nullSrcProps, (prop) => parseInt(prop, 10)));
          objValue = _.clone(objValue);
        } else { // otherwise we can assume the destination is a generic object type. remove null fields and return new object ref
          srcValue = _.omit(srcValue, nullSrcProps);
          objValue = _.omit(objValue, nullSrcProps);
        }

      } else { // if there are no fields to delete, just get a new reference for the object and continue the merge
        objValue = _.clone(objValue);
      }

      return _.mergeWith(objValue, srcValue, customMerge);
    }

    return undefined; // otherwise, let the default merge function handle the merge
  };

  // run merge with destination and source objects using the custom merge function
  return (<any>_.mergeWith(destinationObj, ...sources, customMerge)).content;

}
