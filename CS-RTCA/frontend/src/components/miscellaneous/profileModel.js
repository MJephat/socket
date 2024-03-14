import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (<IconButton
            d={{base: "flex" }}
            icon={<ViewIcon />}
            onClick={onOpen} />
         )}
         <Modal size="lg"  isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent h={"410px"}>
            <center>
          <ModalHeader
          fontSize={"40PX"}
          fontFamily={"Work sans"}
          d="flex"
          justifyContent={"center"}
          alignItems={"center"}
          >
            {user.name}
            </ModalHeader>
            </center>
          <ModalCloseButton />
          <center>
          <ModalBody 
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
            />
            <Text
            fontSize={{ base: "28px", md: "30px" }}
            fontFamily="Work sans"
            >Email:{user.email}</Text>
          </ModalBody>
          </center>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal