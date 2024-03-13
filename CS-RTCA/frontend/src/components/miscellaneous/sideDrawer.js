import { Box, Button, Menu, MenuButton, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()

  

  return (
  <Box
  d="flex"
  justifyContent={"space-between"}
  alignItems={"center"}
  bg={"white"}
  w={"100%"}
  p={"5px 10px 5px 10px"}
  borderWidth={"5px"}
  >
    <Tooltip label="search users to chat"
    hasArrow
    placement='bottom-end'>
      <Button variant="ghost">
      <i class="fa fa-search" aria-hidden="true"></i>
      <Text  d={{ base: "none", md: "flex"}} px="4">

        Search User
      </Text>
      </Button>
    </Tooltip>

    <Text fontSize = "2x1" fontFamily={"Work sans"}>
      Chat-A-Chat
    </Text>

    <div>
      <Menu>
        <MenuButton p={1}>

        </MenuButton>
      </Menu>
    </div>
  </Box>
  )
}

export default SideDrawer;
