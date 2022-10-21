import React, { ReactNode } from 'react';
import {
  useMenuTrigger,
  useMenu,
  useMenuItem,
  AriaButtonProps,
  AriaMenuTriggerProps,
  AriaMenuOptions,
} from 'react-aria';
import {
  MenuTriggerProps,
  TreeProps,
  TreeState,
  useMenuTriggerState,
  useTreeState,
} from 'react-stately';
import { Button } from './Button';

export interface MenuButtonProps
  extends MenuTriggerProps,
    AriaButtonProps<'button'> {
  label: string;
  onAction: (key: string | number) => void;
}

export const MenuButton = ({ label, children, ...props }: MenuButtonProps) => {
  const state = useMenuTriggerState(props);
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, ref);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button {...menuTriggerProps} buttonRef={ref}>
        {label}
        <span aria-hidden="true" style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen && (
        <Menu
          {...props}
          {...menuProps}
          items={children as Iterable<HTMLUListElement>}
          children={children as TreeProps<HTMLUListElement>['children']}
        />
      )}
    </div>
  );
};

export interface MenuProps
  extends AriaMenuOptions<HTMLUListElement>,
    TreeProps<HTMLUListElement> {}

const Menu = ({ ...props }: MenuProps) => {
  const state = useTreeState(props);
  const ref = React.useRef<HTMLUListElement | null>(null);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        width: 150,
      }}
    >
      {[...state.collection].map((item) => (
        <MenuItem key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
};

export interface MenuItemProps extends AriaMenuTriggerProps {
  item: any;
  state: TreeState<HTMLUListElement>;
}

const MenuItem = ({ item, state, ...props }: MenuItemProps) => {
  const ref = React.useRef<HTMLLIElement | null>(null);
  const { menuItemProps, isFocused, isSelected, isDisabled } = useMenuItem(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...menuItemProps}
      ref={ref}
      style={{
        background: isFocused ? 'gray' : 'transparent',
        color: isDisabled ? 'gray' : isFocused ? 'white' : 'black',
        padding: '2px 5px',
        outline: 'none',
        cursor: 'default',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {item.rendered}
      {isSelected && <span aria-hidden="true">✅</span>}
    </li>
  );
};
