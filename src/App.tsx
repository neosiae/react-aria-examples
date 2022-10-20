import { useState } from 'react';
import { Button } from './components/Button';
import { Modal } from './components/Modal';
import { OverlayContainer, OverlayProvider } from 'react-aria';

function App() {
  const [activeModal, setActiveModal] = useState<'a11yModal' | null>(null);
  const isA11yModalOpen = activeModal === 'a11yModal';

  const openA11yModal = () => setActiveModal('a11yModal');
  const handleOnModalDismiss = () => setActiveModal(null);

  return (
    <OverlayProvider>
      <div>
        <Button onPress={openA11yModal}>Open Modal</Button>
        <Button>Random button</Button>
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
    </OverlayProvider>
  );
}

export default App;
