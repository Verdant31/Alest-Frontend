import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import { CreateUserForm } from '../../Forms/CreateAcount';

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserModal({ isOpen, onClose, }: ModalAddImageProps): JSX.Element {
  const handleCloseModal = (): void => {
    onClose();
  };
  return (
    <Modal size="xl" isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent bgColor="#191920">
        <ModalHeader textColor="white">Crie sua conta</ModalHeader>
        <ModalCloseButton color="white" />
        <CreateUserForm onClose={onClose} isOpen={isOpen} />
      </ModalContent>
    </Modal>
  );
}

