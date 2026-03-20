import { Box, Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'

export function Controls({ onSend }) {

    const [content, setContent] = useState("");


    function handleContentChange(event) {
        setContent(event.target.value);
    }

    function handleContentSendControls(){
        if(content.length > 0){
            console.log("content ", content)
            onSend(content)
            setContent("")
        }
    }

    function handleEnterPress(event){
        if(event.key === 'Enter' && !event.shiftKey){
            event.preventDefault()
            handleContentSendControls()

        }
    }

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, height: '100vh', padding: 2 }}>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    multiline placeholder='Message AI Chatbot'
                    value={content}
                    onChange={handleContentChange}
                    onKeyDown={handleEnterPress}
                />
            </Box>
            <Button
                variant="outlined"
                sx={{ backgroundColor: 'white', color: 'black', borderColor: 'black', borderRadius: 2 }}
                endIcon={<SendIcon />}
                onClick={handleContentSendControls}
            >
            </Button>
        </Box>

    )
}


