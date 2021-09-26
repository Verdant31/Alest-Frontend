import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';


import { Box, Text, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';


import { Header } from '../components/Header';

import { storage } from '../services/firebase';
import { useToast } from '@chakra-ui/toast';
import { api } from '../services/api';

type Product = {
  name: any;
  price: any;
  image: any;
  id: string;
}

type EditProductProps = {
  id: string,
}

export function EditProduct() {
  const history = useHistory();
  const toast = useToast();

  const [image, setImage] = useState<File>();
  const { id } = useParams<EditProductProps>();
  const [oldProduct, setoldProduct] = useState<Product>();
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    api.get(`/getproduct/${id}`).then((response) => {
      const data = response.data;
      setoldProduct({
        name: data.name,
        id: id,
        price: data.price,
        image: data.image
      })
    }).catch((error) => {
      console.log(error);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmitProduct(event: FormEvent) {
    event.preventDefault();
    if (image == null || newProductName == null || newProductPrice == null) {
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
          api.put('/updateproduct', {
            id: id,
            name: newProductName,
            price: newProductPrice,
            image: downloadURL
          })
        })
      })
    setTimeout(function () { history.push("/dashboard"); }, 1000)
  }

  function handleUpload(event: any) {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }
  return (
    <>
      <Header />
      <Box mt={["4", "16", "16", "16"]} mb="20" w={["300px", "400px", "600px", "600px"]} h="850px" borderRadius="20px" mx="auto" background="#31313d" as="form" onSubmit={handleSubmitProduct}>
        <Box ml="8" mr="8">
          <Text fontWeight="bold" fontSize="24px" py="4" align="center" color="white">EDITAR PRODUTO</Text>
          <Text fontSize="18px" fontWeight="bold" color="white">Informações antigas</Text>
          <VStack mt="4" spacing="4" align="left" mb="12">
            <Text fontWeight="bold" color="white" >Nome: <Text ml="2" fontWeight="normal" as="span" color="white">{oldProduct?.name}</Text></Text>
            <Text fontWeight="bold" color="white" >Preço: <Text ml="2" fontWeight="normal" as="span" color="white">{oldProduct?.price}</Text></Text>
            <Image w="180px" src={oldProduct?.image} />

          </VStack>
          <Text fontSize="18px" fontWeight="bold" color="white">Informações novas</Text>
          <VStack mx="auto" mt="4" spacing="4" align="left">
            <FormLabel textColor="white">Nome</FormLabel>
            <Input w="90%" textColor="white" type="name" placeholder="Nome" onChange={event => setNewProductName(event.target.value)} />
            <FormLabel textColor="white">Preço</FormLabel>
            <Input w="90%" textColor="white" type="number" placeholder="Nome" onChange={event => setNewProductPrice(event.target.value)} />
            <FormLabel textColor="white">Adicione sua imagem</FormLabel>
            <Box textColor="white" fontSize={["10px", "10px", "11px", "15px", "15px"]}>
              <input onChange={handleUpload} type="file" ></input>
            </Box>
            <VStack spacing="4">
              <Button w="100%" type="submit" colorScheme="blue" >
                Save
              </Button>
              <Button onClick={() => history.push('/dashboard')} w="100%">Cancel</Button>
            </VStack>
          </VStack>

        </Box>
      </Box>
    </>
  )
}
