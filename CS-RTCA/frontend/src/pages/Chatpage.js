import { Box } from "@chakra-ui/react";
import { ChatState } from "../components/context/chatProvider";
import SideDrawer from "../components/miscellaneous/sideDrawer.js";
import MyChats from "../components/myChats.js";
import ChatBox from "../components/ChatBox.js";


const ChatPage = () => {
   const { user } =  ChatState();

   return(
    <div style={{width: "100%"}}>
        {user && <SideDrawer/>}
        <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        height={"91.5vh"}
        padding={"10px"}
        >
            {user && <MyChats />}
            {user && <ChatBox />}
        </Box>
    </div>
    );
};

export default ChatPage;
