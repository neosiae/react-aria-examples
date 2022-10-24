import React from 'react';
import { FocusStrategy } from './types';

export const useTriggerState = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen((isOpen) => !isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    toggle,
    close,
    open,
    setOpen: setIsOpen,
    focusStrategy: FocusStrategy.FIRST,
  };
};
