import { useState } from 'react'
import { Chat } from './components/Chat/Chat'
import { Box, AppBar, Toolbar, Typography, Avatar } from '@mui/material'
import { Controls } from './components/Controls/Controls';
import OpenAI from "openai";


const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
});

function App() {

  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSendApp(content) {
    addMessage({ content, role: "user" });
    try {
      const result = await client.chat.completions.create({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [...messages, { content, role: "user" }]
      });
      addMessage({ content: result.choices[0].message.content, role: "assistant" });
    } catch (error) {
      addMessage({
        content: error + " Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    }
  }



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100vh', padding: 2 }}>

      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'center', gap: 1 }}>
          <Avatar src="/chat-bot.png" sx={{ width: 64, height: 64 }} />
          <Typography variant="h5">AI Chatbot</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <Chat messages={messages} />
        <Controls onSend={handleContentSendApp} />
      </Box>

    </Box>
  )
}




export default App
