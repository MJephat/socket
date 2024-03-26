import React, { useEffect, useState } from 'react'
import { ChatState } from './context/chatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/chatLogics';
import ProfileModal from './miscellaneous/profileModel';
import UpdateGroupChatModal from './miscellaneous/updateGroupChat';
import axios from 'axios';
import "../components/sytle.css";
import ScrollableChat from './scrollableCat';
import io from 'socket.io-client'


// const ENDPOINT = "http://localhost:8080";
const ENDPOINT = "https://socket-2.onrender.com";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain}) => {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const { user ,selectedChat, setSelectedChat} = ChatState();

  const toast = useToast();

  const fetchMessages = async() =>{
    if(!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      setLoading(true);
      
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      )
      console.log(messages)
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id)
      
    } catch (error) {
           toast({
             title: "Error Occured",
             description: "Failed to load messages",
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "bottom",
           });
      
    }
  };

   useEffect(() => {
     socket = io(ENDPOINT);
     socket.emit("setup", user);
     socket.on("connected", () => setSocketConnected(true));
     socket.on("typing", () => setIsTyping(true));
     socket.on("stop typing", ()=> setIsTyping(false));
   }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  },[selectedChat]);


  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  })

  const sendMessage = async (event) =>{
    if (event.key === "Enter" && newMessage){
      socket.emit("stop typing", selectedChat._id)
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
        
        setNewMessage("");
        const { data } = await axios.post("/api/message",{
          content: newMessage,
          chatId: selectedChat._id,
        },config);

        console.log(data);

        socket.emit("new message", data);
        setMessages([...messages, data]);

      } catch (error) {
        toast({
          title: "Error Occured",
          description: "message was not sent",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom"
        })
        
      }
    }
  };



   const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing Indicator logic
    if(!socketConnected) return;

    if (!typing){
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength =3000;
    setTimeout(() =>{
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing){
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);


   };

  return (
    <>
      {selectedChat ? (
      <>
      <Text
      fontSize={{ base: '28px', md:'30px' }}
      pb={3}
      px={2}
      width={'100%'}
      fontFamily={'Work sans'}
      display="flex"
      justifyContent={{base:'space-betwwen'}}
      alignItems={'center'}
      >
        <IconButton 
        display={{ base : "flex", md: "none"}}
        icon={<ArrowBackIcon />}
        onClick={() => setSelectedChat("")}
        />
        {!selectedChat.isGroupChat ? (
        <>
        {getSender(user, selectedChat.users)}
        <ProfileModal user={getSenderFull(user, selectedChat.users)} />
        </>
        ) : (
        <>
        {selectedChat.chatName.toUpperCase()}
        <UpdateGroupChatModal 
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        fetchMessages={fetchMessages}
        />
        </>
        )}
      </Text>

      <Box
      display={'flex'}
      flexDir={'column'}
      justifyContent={'flex-end'}
      p={3}
      bg={'#E8E8E8'}
      w={'100%'}
      h={'100%'}
      borderRadius={'lg'}
      overflowY={'hidden'}
      >
          {loading ? 
          <Spinner
          size={'xl'}
          w={20}
          h={20}
          alignSelf={'center'}
          margin={'auto'}
          /> : <div className='messages'> 
            <ScrollableChat messages={messages} />
            </div>}


            <FormControl onKeyDown={sendMessage} isRequired mt={3}>

            {isTyping ? <div>typing....</div>:<></>}

              <Input 
              variant="filled"
              bg={'#E0E0E0'}
              placeholder='Enter a message...'
              onChange={typingHandler}
              value={newMessage}
              />

            </FormControl>
      </Box>
      </>
      ):(
        <Box display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        h={'100%'}>
           <Text fontSize={'3xl'} pb={3} fontFamily={'Work sans'}>
            Click on a user to start chatting
            </Text> 
        </Box>
      )}
    </>
  )
}

export default SingleChat
