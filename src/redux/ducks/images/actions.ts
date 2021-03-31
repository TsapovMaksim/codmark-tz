import {
  ClearImagesActionInterface,
  FetchImagesActionInterface,
  ImageInterface,
  ImagesActionsType,
  LoadingStateType,
  SetGroupImagesActionInterface,
  SetImagesActionInterface,
  SetLoadingStateActionInterface,
} from './types';

export const setImage = (
  payload: ImageInterface[]
): SetImagesActionInterface => ({
  type: ImagesActionsType.SET_IMAGES,
  payload,
});

export const fetchImage = (tags: string[]): FetchImagesActionInterface => ({
  type: ImagesActionsType.FETCH_IMAGES,
  payload: tags,
});

export const setLoadingState = (
  payload: LoadingStateType
): SetLoadingStateActionInterface => ({
  type: ImagesActionsType.SET_LOADING_STATE,
  payload,
});

export const clearImages = (): ClearImagesActionInterface => ({
  type: ImagesActionsType.CLEAR_IMAGES,
});

export const setGroupedImages = (
  flag: boolean
): SetGroupImagesActionInterface => ({
  type: ImagesActionsType.SET_GROUP_IMAGES,
  payload: flag,
});
