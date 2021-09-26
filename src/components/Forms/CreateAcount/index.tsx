import { FormEvent, useState } from 'react';
import { Input, Button, Box, VStack, ModalBody, FormLabel, useToast } from "@chakra-ui/react"
import { api } from '../../../services/api';

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateUserForm({ isOpen, onClose }: AddProductFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const toast = useToast();

  async function signUp(event: FormEvent) {
    event.preventDefault();
    const data = await api.post('/createuser', {
      email: email,
      password: password,
    });
    if (typeof data.data == 'object') {
      toast({
        title: 'Usuário cadastrado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: data.data,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box as="form" onSubmit={signUp}>
      <ModalBody mb="8">
        <VStack align="flex-start" spacing="8" mb="12">
          <VStack align="flex-start" w="80%" spacing="0">
            <FormLabel textColor="white">E-mail</FormLabel>
            <Input textColor="white" value={email} onChange={event => setEmail(event.target.value)} type="Email" placeholder="Nome" />
          </VStack >
          <VStack align="flex-start" w="80%" spacing="0">
            <FormLabel textColor="white">Senha</FormLabel>
            <Input textColor="white" value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Senha" />
          </VStack>
        </VStack>
        <Button type="submit" colorScheme="blue" mr={3}>
          Criar
        </Button>
        <Button onClick={() => onClose()}>Cancel</Button>
      </ModalBody>

    </Box>
  );
}
