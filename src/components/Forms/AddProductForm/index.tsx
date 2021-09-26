import { FormEvent, useState } from 'react';

import { Input, Button, Box, VStack, useToast } from "@chakra-ui/react"
import { ModalBody, } from '@chakra-ui/react';
import { FormLabel, } from "@chakra-ui/react"

import { storage } from '../../../services/firebase';
import { api } from '../../../services/api';

interface AddProductFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductForm({ isOpen, onClose }: AddProductFormProps) {
  const [image, setImage] = useState<File>();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const toast = useToast();

  async function handleSubmitProduct(event: FormEvent) {
    console.log(productPrice);
    event.preventDefault();
    if (image == null || productName === '' || productPrice === '') {
      toast({
        title: 'Por favor, preencha todos os campos',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    await storage.ref(`/images/${image.name}`).put(image)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then(async function (downloadURL) {
          api.post('/addproduct', {
            name: productName,
            price: productPrice,
            image: downloadURL
          })
        })
      })
    toast({
      title: 'Produto adicionado!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => window.location.reload(), 1000)
  }

  function handleUpload(event: any) {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmitProduct}>
      <ModalBody mb="8">

        <VStack align="flex-start" spacing="8" mb="12">
          <VStack align="flex-start" w="80%" spacing="0">
            <FormLabel textColor="white">Nome</FormLabel>
            <Input textColor="white" value={productName} onChange={event => setProductName(event.target.value)} type="name" placeholder="Nome" />
          </VStack >
          <VStack align="flex-start" w="80%" spacing="0">
            <FormLabel textColor="white">Preço(R$)</FormLabel>
            <Input textColor="white" value={productPrice} onChange={event => setProductPrice(event.target.value)} type="number" placeholder="Preço" />
          </VStack>
          <VStack align="flex-start" spacing="0">
            <Box textColor="white" >
              <FormLabel textColor="white">Adicione sua imagem</FormLabel>
              <Box fontSize={["11px", "11px", "11px", "15px", "15px"]}>
                <input type="file" onChange={handleUpload}></input>
              </Box>
            </Box>
          </VStack>
        </VStack>

        <Button type="submit" colorScheme="blue" mr={3}>
          Save
        </Button>
        <Button onClick={() => onClose()}>Cancel</Button>

      </ModalBody>

    </Box>
  );
}
