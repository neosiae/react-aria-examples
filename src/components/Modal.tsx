import React from 'react';
import {
  AriaDialogProps,
  AriaOverlayProps,
  FocusScope,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
} from 'react-aria';

export interface ModalProps extends AriaDialogProps, AriaOverlayProps {
  children: React.ReactNode;
  title: string;
}

export const Modal = ({ children, title, ...props }: ModalProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { overlayProps, underlayProps } = useOverlay(props, ref);
  const { modalProps } = useModal();
  const { dialogProps, titleProps } = useDialog(props, ref);

  usePreventScroll();

  return (
    <div
      {...underlayProps}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <FocusScope contain restoreFocus autoFocus>
        <div
          {...overlayProps}
          {...modalProps}
          {...dialogProps}
          ref={ref}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '0.25rem',
            zIndex: 1,
          }}
        >
          <h3 {...titleProps}>{title}</h3>
          <div>{children}</div>
        </div>
      </FocusScope>
    </div>
  );
};
