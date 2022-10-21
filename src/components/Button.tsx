import { useRef } from 'react';
import { useButton, AriaButtonProps } from 'react-aria';

export interface ButtonProps extends AriaButtonProps {
  children: React.ReactNode;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export const Button = ({ children, buttonRef, ...props }: ButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const _ref = buttonRef ?? ref;
  const { buttonProps } = useButton(props, _ref);

  return (
    <button {...buttonProps} ref={_ref}>
      {children}
    </button>
  );
};
