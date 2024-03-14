import React, { useState } from 'react'
import { ChatState } from "../../components/context/chatProvider";
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {selectedChat, setSelectedChat, user, chats, setChats} = ChatState();
 
  const toast = useToast();

  const fetchChats =async () =>{
    // console.log(user._id);
    try{
      const config = {
        headers: {
          Authorization:  `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("api/chat", config);
      setChats(data);
    }catch(e){
      toast({
        title: "Error Occured!",
        description: "Failed to Load chats",
        status: "error",
        duration:5000,
        isClosable: true,
        position: "bottom-left",
      })

    }
  }
  return (
    <div>
     My Chats
    </div>
  )
}

export default MyChats;
