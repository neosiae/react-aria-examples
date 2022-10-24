import React from 'react';
import {
  useMenuTrigger,
  useMenu,
  useMenuItem,
  AriaButtonProps,
  AriaMenuTriggerProps,
  AriaMenuOptions,
} from 'react-aria';
import { MenuTriggerProps, TreeProps, TreeState } from 'react-stately';
import { useTriggerState } from '../state/useTriggerButtonState';
import { Button } from './Button';
import { TreeStateExtended } from '../state/types';
import { useTreeStateExtended } from '../state/useTreeStateExtended';

export interface MenuButtonProps
  extends MenuTriggerProps,
    AriaButtonProps<'button'> {
  label: string;
  onAction: (key: string | number) => void;
}

export const MenuButton = ({ label, children, ...props }: MenuButtonProps) => {
  const state = useTriggerState();
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
  const state = useTreeStateExtended(props);
  const ref = React.useRef<HTMLUListElement | null>(null);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <div
      style={{
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div
        style={{
          marginTop: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onPress={() => {
            state.toggleInfoVisibility();
          }}
        >
          Show info
        </Button>
      </div>
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
      {state.isInfoVisible && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              onPress={() => {
                state.toggleInfoVisibility();
              }}
            >
              X
            </Button>
            Some info goes here
          </div>
        </div>
      )}
    </div>
  );
};

type Item = ReturnType<TreeState<HTMLUListElement>['collection']['getItem']>;

export interface MenuItemProps extends AriaMenuTriggerProps {
  item: Item;
  state: TreeStateExtended<HTMLUListElement>;
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
