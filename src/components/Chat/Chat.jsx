import { Box, AppBar, Toolbar, Typography, Avatar } from '@mui/material'


  const WELCOME_MESSAGE = {
    role : 'assistant',
    content:'Hello! How can I assist you right now'
  }



export function Chat({ messages }) {

  const allMessages = [WELCOME_MESSAGE, ...messages]


  return (

    <Box >{allMessages.map(({ role, content }, index) => (
      <Box key={index} data-role={role} >
        {content}
      </Box>))}
    </Box>
  )
}
