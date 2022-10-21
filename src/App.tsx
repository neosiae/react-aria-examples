import { useState } from 'react';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { OverlayContainer, OverlayProvider } from 'react-aria';
import { MenuButton } from './components/DropdownMenu';
import { Item } from 'react-stately';
import { ToggleButton } from './components/ToggleButton';
import { NumberField } from './components/NumberField';

function App() {
  const [activeModal, setActiveModal] = useState<'a11yModal' | null>(null);
  const isA11yModalOpen = activeModal === 'a11yModal';

  const openA11yModal = () => setActiveModal('a11yModal');
  const handleOnModalDismiss = () => setActiveModal(null);

  return (
    <OverlayProvider>
      <div>
        <div
          style={{
            display: 'flex',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <Button onPress={openA11yModal}>Open modal</Button>
          <Button>Random button</Button>
          <ToggleButton>Toggle button</ToggleButton>
        </div>

        {isA11yModalOpen && (
          <OverlayContainer>
            <Modal
              title="a11y modal"
              isDismissable
              isOpen={isA11yModalOpen}
              onClose={handleOnModalDismiss}
            >
              How cool is this?
              <div
                style={{
                  marginTop: '1rem',
                }}
              >
                <Button>Accept</Button>
                <Button onPress={handleOnModalDismiss}>Close</Button>
              </div>
            </Modal>
          </OverlayContainer>
        )}

        <MenuButton label="Dropdown menu" onAction={alert}>
          <Item key="copy">Copy</Item>
          <Item key="cut">Cut</Item>
          <Item key="paste">Paste</Item>
        </MenuButton>

        <div
          style={{
            marginTop: '1rem',
          }}
        >
          <NumberField
            label="Price"
            defaultValue={1}
            locale="en-US"
            formatOptions={{
              style: 'currency',
              currency: 'USD',
            }}
          />
        </div>
      </div>
    </OverlayProvider>
  );
}

export default App;
