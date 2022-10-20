import { useRef } from 'react';
import { useButton, AriaButtonProps } from 'react-aria';

export interface ButtonProps extends AriaButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button {...buttonProps} ref={ref}>
      {children}
    </button>
  );
};
