import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../context/chatProvider';
import UserBadgeItem from '../UserAvatar/userBadgeItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain}) => {

    const { isOpen, onOpen, onClose }= useDisclosure();
    const { selectedChat, setSelectedChat, user } = ChatState();
    
    const [chatName, setChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();
    
    const handleRemove = ()=>{};

  return (
    <>
      <>
      <IconButton display={{ base: "flex" }}
      icon={<ViewIcon />}
      onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader 
          fontSize={'35px'}
          fontFamily={'Work sans'}
          display={'flex'}
          justifyContent={'center'}
          >
            {selectedChat.chatName}
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box  width={'100%'} display={'flex'} flexWrap={'wrap'} pb={3}>
            {selectedChat.users.map((u)=>(
                <UserBadgeItem
                key={user._id}
                user={u}
                handleFunction={()=>handleRemove(u)} />
            ))}
          </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </> 
    </>
  )
}

export default UpdateGroupChatModal
