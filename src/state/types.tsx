import { TreeState } from 'react-stately';

export enum FocusStrategy {
  FIRST = 'first',
  LAST = 'last',
}

export interface TreeStateExtended<T> extends TreeState<T> {
  isInfoVisible: boolean;
  toggleInfoVisibility: () => void;
}
