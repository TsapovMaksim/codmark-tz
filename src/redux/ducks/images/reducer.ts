import {
  ImageInterface,
  ImagesActions,
  ImagesActionsType,
  LoadingStateType,
} from './types';
import produce, { Draft } from 'immer';

interface State {
  images: ImageInterface[];
  loadingState: LoadingStateType;
  isGrouped: boolean;
}

const initialState: State = {
  images: [],
  loadingState: 'never',
  isGrouped: false,
};

export const imagesReducer = produce(
  (draft: Draft<State>, action: ImagesActions) => {
    switch (action.type) {
      case ImagesActionsType.SET_IMAGES: {
        draft.images = [...draft.images, ...action.payload];
        draft.loadingState = 'loaded';
        break;
      }

      case ImagesActionsType.FETCH_IMAGES: {
        draft.loadingState = 'loading';
        break;
      }

      case ImagesActionsType.CLEAR_IMAGES: {
        draft.images = [];
        break;
      }

      case ImagesActionsType.SET_LOADING_STATE: {
        draft.loadingState = action.payload;
        break;
      }

      case ImagesActionsType.SET_GROUP_IMAGES: {
        draft.isGrouped = action.payload;
        break;
      }

      default:
        break;
    }
  },
  initialState
);
