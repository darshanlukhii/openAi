import {applyMiddleware, combineReducers, createStore} from 'redux';
import { thunk } from 'redux-thunk';
import chatReducer from './Reducer/chatReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;

// export default rootReducer
