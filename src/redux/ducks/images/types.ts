import { Action } from 'redux';

export enum ImagesActionsType {
  SET_IMAGES = 'images/SET_IMAGES',
  SET_LOADING_STATE = 'images/SET_LOADING_STATE',
  FETCH_IMAGES = 'images/FETCH_IMAGES',
  CLEAR_IMAGES = 'images/CLEAR_IMAGES',
  SET_GROUP_IMAGES = 'images/SET_GROUP_IMAGES',
}

export interface ImageInterface {
  imageUrl: string;
  tag: string;
  id: string;
}

export type LoadingStateType =
  | 'never'
  | 'loading'
  | 'loaded'
  | 'error'
  | 'not found';

export interface FetchImagesActionInterface extends Action<ImagesActionsType> {
  type: ImagesActionsType.FETCH_IMAGES;
  payload: string[];
}

export interface SetImagesActionInterface extends Action<ImagesActionsType> {
  type: ImagesActionsType.SET_IMAGES;
  payload: ImageInterface[];
}

export interface SetLoadingStateActionInterface
  extends Action<ImagesActionsType> {
  type: ImagesActionsType.SET_LOADING_STATE;
  payload: LoadingStateType;
}

export interface ClearImagesActionInterface extends Action<ImagesActionsType> {
  type: ImagesActionsType.CLEAR_IMAGES;
}

export interface SetGroupImagesActionInterface
  extends Action<ImagesActionsType> {
  type: ImagesActionsType.SET_GROUP_IMAGES;
  payload: boolean;
}

export type ImagesActions =
  | SetImagesActionInterface
  | SetLoadingStateActionInterface
  | ClearImagesActionInterface
  | SetGroupImagesActionInterface
  | FetchImagesActionInterface;
