import { all } from '@redux-saga/core/effects';
import {
  clearImagesSaga,
  groupImagesSaga,
  imagesSaga,
} from './ducks/images/sagas';

export default function* rootSaga() {
  yield all([imagesSaga(), clearImagesSaga(), groupImagesSaga()]);
}
