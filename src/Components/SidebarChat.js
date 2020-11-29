import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import '../Styling/SidebarChat.css'
import axios from 'axios'

function SidebarChat({ addNewChat, roomId, roomName, setRoomRefresh, setChatData }) {

    const [seed, setSeed] = useState('')

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createRoom = () => {
        const roomName = prompt("Please enter room name.")

        if (roomName) {                                                                     // create room API
            axios.post(`http://localhost:8080/whatsapp/createRoom`, { roomName: roomName })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    setRoomRefresh(roomName);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const openRoom = () => {
        // alert(roomId);
        axios.post(`http://localhost:8080/whatsapp/chat`, { roomId: roomId })
            .then(res => {
                console.log(res);
                console.log(res.data);
                setChatData(res.data.responseObj);
            })
            .catch(error => {
                console.log(error);
            })

    }

    return !addNewChat ? (
        <div onClick={openRoom} className='sidebarChat '>
            <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className='sidebarChat_info'>
                <h2>{roomName}</h2>
                <p>Last Message...</p>
            </div>
        </div>
    ) : (
            <div onClick={createRoom} className='sidebarChat'>
                <h2>Add New Room</h2>
            </div>
        );
}

export default SidebarChat
