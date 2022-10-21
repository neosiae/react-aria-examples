import React from 'react';
import { AriaToggleButtonProps, useToggleButton } from 'react-aria';
import { useToggleState } from 'react-stately';

export interface ToggleButtonProps extends AriaToggleButtonProps {}

export const ToggleButton = ({ children, ...props }: ToggleButtonProps) => {
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const state = useToggleState(props);
  const { buttonProps, isPressed } = useToggleButton(props, state, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      style={{
        background: isPressed
          ? state.isSelected
            ? 'darkblue'
            : 'gray'
          : state.isSelected
          ? 'blue'
          : 'lightgray',
        color: state.isSelected ? 'white' : 'black',
        padding: 10,
        fontSize: 16,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        border: 'none',
      }}
    >
      {children}
    </button>
  );
};
