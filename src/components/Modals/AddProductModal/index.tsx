import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, useBreakpointValue } from '@chakra-ui/react';
import { AddProductForm } from '../../Forms/AddProductForm';

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddImage({ isOpen, onClose, }: ModalAddImageProps): JSX.Element {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
  const handleCloseModal = (): void => {
    onClose();
  };

  if (!isWideVersion) {

    return (
      <Modal size="xs" isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent bgColor="#191920">
          <ModalHeader textColor="white">Adicione seu produto</ModalHeader>
          <ModalCloseButton color="white" />
          <AddProductForm onClose={onClose} isOpen={isOpen} />
        </ModalContent>
      </Modal>
    )
  }
  return (

    <Modal size="xl" isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />

      <ModalContent bgColor="#191920">
        <ModalHeader textColor="white">Adicione seu produto</ModalHeader>

        <ModalCloseButton color="white" />
        <AddProductForm onClose={onClose} isOpen={isOpen} />
      </ModalContent>
    </Modal>
  );
}

