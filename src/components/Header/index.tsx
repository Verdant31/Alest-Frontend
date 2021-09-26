import { useHistory } from 'react-router';

import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Text } from '@chakra-ui/layout';

import firebase from 'firebase';

import { FaUserAlt } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import Icon from '@chakra-ui/icon';
import { useAuth } from '../../hooks/useAuth';



export function Header() {
  const { user } = useAuth();
  const history = useHistory();
  async function signOut() {
    await firebase.auth().signOut().catch((err) => {
      console.log(err);
    })
    history.push('/');
  }
  return (

    <Flex >

      <Flex w="100%" h="120px">
        <Flex my="auto" >
          <Image align="left" mr="8" w={"250px"} h="70px" my="auto" src="/logo.png" alt="Logo" />
        </Flex>
        <Text fontSize={["0px", "0px", "20px", "32px"]} mx="auto" my="auto" color="gray.100">CRUD DE PRODUTOS</Text>
        <Flex align="center" >
          <Box align="center" display={["", "", "flex", "flex"]} pr={["0", "15", "20", "20"]}>
            <Flex mr="8">
              <Button variant="ghost" onClick={signOut}>
                <Icon w={10} h={10}><FiLogOut color="white" /></Icon>

              </Button>

              <Icon w={10} h={10}><FaUserAlt color="white" /></Icon>
            </Flex>
            <Text align="center" pr="8" mx="auto" color="white" fontSize={["sm", "md", "lg", "lg"]}>{user?.email}</Text>
          </Box>
        </Flex>
      </Flex>


    </Flex>


  )
}
