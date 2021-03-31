import { imagesReducer } from './ducks/images/reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ images: imagesReducer });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
