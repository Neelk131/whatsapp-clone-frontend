import React, { useState, useEffect } from 'react'
import '../Styling/Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import axios from 'axios';

function Sidebar({setChatData}) {

    const [rooms, setRooms] = useState([])
    const [roomRefresh, setRoomRefresh] = useState('')

    useEffect(() => {                                                   // Get Rooms API
        const unsubscribe = axios.post(`http://localhost:8080/whatsapp/rooms`, {})
            .then(res => {
                setRooms(res.data.responseObj)
                console.log(res.data.responseObj);
                console.log(rooms);
            })
            .catch(error => {
                console.log(error);
            });

            return () => {
                unsubscribe();
            }

    }, [roomRefresh])

    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar />
                <div className='sidebar_headerRight'>
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className='sidebar_search'>
                <div className='sidebar_searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type='text'></input>
                </div>
            </div>

            <div className='sidebar_chats'>         {/*Get rooms API*/}
                <SidebarChat addNewChat setRoomRefresh = {setRoomRefresh}/>

                {rooms.map((temp) => (<SidebarChat key={temp.id} roomId = {temp.id} roomName = {temp.roomName} setChatData = {setChatData}></SidebarChat>))}

            </div>
        </div>
    )
}

export default Sidebar
