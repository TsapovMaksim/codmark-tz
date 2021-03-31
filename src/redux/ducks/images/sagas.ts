import { setLoadingState, setImage } from './actions';
import { imageApi } from './../../../api/imageApi';
import {
  ImagesActionsType,
  FetchImagesActionInterface,
  ImageInterface,
} from './types';
import { call, fork, put, take } from 'redux-saga/effects';

export function* fetchImageRequest(tags: string[]) {
  try {
    const data: ImageInterface[] = yield call(imageApi.fetchImage, tags);
    if (data.some(({ imageUrl }) => !!!imageUrl)) {
      yield put(setLoadingState('not found'));
    } else {
      yield put(setImage(data));
    }
  } catch {
    yield put(setLoadingState('error'));
  }
}

export function* imagesSaga() {
  while (true) {
    const { payload }: FetchImagesActionInterface = yield take(
      ImagesActionsType.FETCH_IMAGES
    );

    yield fork(fetchImageRequest, payload);
  }
}

export function* clearImagesSaga() {
  yield take(ImagesActionsType.CLEAR_IMAGES);
}

export function* groupImagesSaga() {
  yield take(ImagesActionsType.SET_GROUP_IMAGES);
}
