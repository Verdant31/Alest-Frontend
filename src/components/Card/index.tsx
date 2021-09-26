/* eslint-disable array-callback-return */
import { useState } from 'react';
import { useHistory } from 'react-router';

import { useDisclosure } from '@chakra-ui/hooks';

import { api } from '../../services/api';

import { useToast } from '@chakra-ui/toast';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image'
import { Box, SimpleGrid, Text } from '@chakra-ui/layout'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import Icon from '@chakra-ui/icon';
import { Input } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { RiSearchLine } from 'react-icons/ri';

import { useInfiniteQuery } from 'react-query';

import { ModalAddImage } from '../Modals/AddProductModal/index';
import { Loading } from '../Loading';
import { Error } from '../Error';



type Product = {
  name: any;
  price: any;
  image: any;
  id: string;
}[]


export function Card() {
  const [products, setProducts] = useState<Product>();
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure({});
  const [searchProductName, setSearchProductName] = useState('');

  const { isLoading, isError } =
    useInfiniteQuery(
      'products',
      async () => {
        await api.get('getproducts').then((response) => {
          const data = response.data;
          const newData = Object.keys(data).map(key => ({
            name: data[key].name,
            price: data[key].price,
            image: data[key].image,
            id: key,
          }))
          setProducts(newData);
        })
      }
    );
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  function handleDeleteProduct(idProduct: string) {

    api.delete(`/deleteproduct/${idProduct}`).then((response) => {
    }).catch((err) => {
      toast({
        title: err,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    })
    toast({
      title: 'Produto deletado!',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => window.location.reload())
  }

  function handleOpenModal(idProduct: string) {
    history.push(`/EditProduct/${idProduct}`)
  }

  return (
    <>

      <Box display={["", "", "flex", "flex"]} justify="center" mx="auto" align="center" alignItems="center" mt="12">
        <Flex mx={["", "", "", "auto"]} as="form" h="50px" w={[300, 450, 650, 750]} color="gray.200" bg="gray.800" align="center" borderRadius="full">
          <Input onChange={event => setSearchProductName(event.target.value)} color="gray.50" variant="unstyled" ml="8" mr="4" placeholder="Buscar na plataforma" _placeholder={{ color: 'gray.400' }} />
          <Icon as={RiSearchLine} fontSize="20" mr="8" />
        </Flex>
        <Button mx="auto" w={52} ml={["0", "", "12", "12"]} mt={["12", "12", "0", "0"]} bgColor="#3182CE" color="white" onClick={() => onOpen()} >Adicionar Produto</Button>
        <ModalAddImage isOpen={isOpen} onClose={onClose} />
      </Box>

      <Flex w="100%" mt="20" justify="center">
        <SimpleGrid minChildWidth="250px" templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gap="20">
          {products?.filter((val) => {
            if (!searchProductName) return val;
            if (val.name.includes(searchProductName)) {
              return val;
            }

          }).map(product => {
            return (

              <Box key={product.id} borderRadius="20px" w={["250px", "150px", "200px", "250px"]} h={["400px", "280px", "350px", "400px"]} bgColor="gray.800" pos="relative" >
                <Text fontSize={["20px", "15px", "20px"]} mt={4} align="center" color="white" >{product.name}</Text>
                <Image mt="6" w="100%" h={["200px", "100px", "130px", "200px"]} src={product.image} alt="Tenis" />
                <Text fontSize={["20px", "20px", "20px"]} mt={6} align="center" color="white">R${product.price}</Text>
                <Button borderBottomRightRadius="20px" height="50px" borderRadius="0" w="50%" pos="absolute" right="0" bgColor="#3182CE" bottom="0" onClick={() => handleDeleteProduct(product.id)} ><RiDeleteBin5Line size="30px" color="white" /></Button>
                <Button borderBottomLeftRadius="20px" height="50px" borderRadius="0" w="50%" pos="absolute" bottom="0" bgColor="#3182CE" onClick={() => handleOpenModal(product.id)} ><BiEdit size="30px" color="white" /></Button>
                <ModalAddImage isOpen={isOpen} onClose={onClose} />
              </Box>
            )

          })}

        </SimpleGrid >
      </Flex>

    </>
  )
}
