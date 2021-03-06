import 'meteor/underscore';

import { outputHandler } from './output-handler.js';

let handleMethodResult = (func) => {
    return (error, result) => {
      if (error) {
        outputHandler(error);
      } else if (_.isFunction(func)) {
        func(result);
      }
    }
  };
export {  handleMethodResult };