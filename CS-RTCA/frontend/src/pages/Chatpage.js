import { Box } from "@chakra-ui/react";
import { ChatState } from "../components/context/chatProvider";
import SideDrawer from "../components/miscellaneous/sideDrawer.js";
import MyChats from "../components/myChats.js";
import ChatBox from "../components/chatBox.js";
import { useState } from "react";


const ChatPage = () => {
   const { user } =  ChatState();
   const [fetchAgain, setFetchAgain] = useState(false);

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
            {user && (<MyChats  fetchAgain={fetchAgain} />)}
            {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
        </Box>
    </div>
    );
};

export default ChatPage;
