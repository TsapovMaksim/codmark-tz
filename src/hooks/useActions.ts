import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImageActionCreators from '../redux/ducks/images/actions';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ImageActionCreators, dispatch);
};
