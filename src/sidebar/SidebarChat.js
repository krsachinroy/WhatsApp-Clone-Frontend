import React, { useEffect, useState } from 'react'
import './CSS/SidebarChat.css';
import { Avatar } from '@material-ui/core';
import Cookies from 'js-cookie'
import axios from '../axios'
function SidebarChat({ data }) {

    const user = JSON.parse(Cookies.get('User'));
    const [contactData, setContactData] = useState(null)
    const id = data.filter(m => m !== user._id)
    useEffect(() => {
        const getContactDetails = async (id) => {
            await axios.get(`/addContact/${id}`).then((response) => {
                setContactData(response.data)
            })
        }
        getContactDetails(id[0]);
    }, [])
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat_info">
                <h2>{contactData?.Username}</h2>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
