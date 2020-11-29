import React, { useState, useEffect, useRef } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { SearchOutlined } from '@material-ui/icons';
import '../Styling/Chat.css'
import axios from 'axios'

function Chat({ chatData, setChatData, userId }) {

    const [seed, setSeed] = useState('')
    const [input, setInput] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    useEffect(() => {
        console.log("chatdata : " +chatData);
    }, [chatData])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typed >>', input);
        // console.log(chatData);
        axios.post(`http://localhost:8080/whatsapp/saveMessage`, {
            message: {
                message: input,
                sentTime: new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })).toISOString(),
                senderId: userId,
                roomId: chatData.id
            }
        })
            .then(res => {
                console.log(res.data);
                setChatData(res.data.responseObj)
            })
            .catch(error => {
                console.log(error);
            })
        setInput('');
    };

    function compareMessage(obj1, obj2) {
        if (obj1.sentTime > obj2.sentTime) return 1;
        if (obj2.sentTime > obj1.sentTime) return -1;
      
        return 0;
      }

    //   const messagesEndRef = useRef(null)

    //   const scrollToBottom = () => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    //   }
    
    //   useEffect(scrollToBottom, [messages]);

    return (
        <div className='chat'>

            <div className='chat_header'>
                <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat_headerInfo'>
                    <h3>{chatData.roomName}</h3>
                    <p>Last Seen at ...</p>
                </div>

                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='chat_body'>

                {chatData.chat !== undefined && chatData.chat.sort(compareMessage).map((temp) => (
                    <p className={`chat_message ${temp.senderId === userId && 'chat_reciever'}`}>
                        <spam className='chat_name'>
                            {temp.senderId}
                        </spam>
                        {temp.message}
                        <span className='chat_timestamp'>{temp.sentTime}</span>
                    </p>))}

                {/* <p className={`chat_message ${true && 'chat_reciever'}`}>
                    <spam className='chat_name'>
                        Neel Kumar
                    </spam>
                    Hey Guys
                    <span className='chat_timestamp'>3:52pm</span>
                </p>
                <p className='chat_message'>
                    Hey Guys <br />
                    neel
                    <span className='chat_timestamp'>3:52pm</span>
                </p> */}

            </div>

            <div className='chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Type a message..' type='text' />
                    <button onClick={sendMessage} type='submit' >Send a Message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
