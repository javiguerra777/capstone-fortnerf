import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import type { RootState, AppDispatch } from './index';

export const useAppDistpatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
