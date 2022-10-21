import React from 'react';
import { useNumberField } from 'react-aria';
import { NumberFieldStateOptions, useNumberFieldState } from 'react-stately';
import { Button } from './Button';

export interface NumberFieldProps extends NumberFieldStateOptions {}

export const NumberField = ({ ...props }: NumberFieldProps) => {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const state = useNumberFieldState(props);
  const {
    labelProps,
    inputProps,
    groupProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, ref);

  return (
    <div>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps}>
        <Button {...decrementButtonProps}>-</Button>
        <input {...inputProps} ref={ref} />
        <Button {...incrementButtonProps}>+</Button>
      </div>
    </div>
  );
};
