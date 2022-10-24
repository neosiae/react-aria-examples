import {
  CollectionBase,
  Expandable,
  MultipleSelection,
} from '@react-types/shared';
import React from 'react';
import { useTreeState } from 'react-stately';

export interface TreeProps<T>
  extends CollectionBase<T>,
    Expandable,
    MultipleSelection {}

export const useTreeStateExtended = <T extends object>(props: TreeProps<T>) => {
  const [isInfoVisible, setIsInfoVisible] = React.useState(false);
  const state = useTreeState(props);

  const toggleInfoVisibility = () =>
    setIsInfoVisible((isVisible) => !isVisible);

  return {
    ...state,
    isInfoVisible,
    toggleInfoVisibility,
  };
};
