import { Dispatcher } from "flux";

//const dispatcher = new Dispatcher();
//dispatcher.dispatchAsync = function dispatchAsync(promise, types, action = {}) {
//    const { request, success, failure } = types;
//
//    dispatch(request, action);
//    //NB: unable to use Promise.catch() syntax here
//    promise.then(
//        //dispatches the action for the async-promise-resolved
//        //with a hash of the async-promise params and the response body
//        (body) => dispatch(success, { ...action, body }),
//        (error) => dispatch(failure, { ...action, error })
//    )
//};
export default new Dispatcher;
