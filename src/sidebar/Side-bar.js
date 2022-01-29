import React, { useState, useEffect } from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './CSS/Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add';
import SidebarChat from './SidebarChat';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import AddContact from './AddContact';
import axios from '../axios';
import Cookies from 'js-cookie';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));
function Sidebar({ setConvId, socket }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [contactData, setContactData] = useState(null);
    const [arrivalContact, setArrivalContact] = useState(null);
    const user = JSON.parse(Cookies.get('User'));
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getContact = async (id) => {
            await axios.get(`/addContact/loadData/${id}`).then((response) => {

                setContactData(response.data);

            }).catch((error) => {
                console.log("Contact data not found");
            })
        }
        getContact(user._id);

    }, [user._id])
    const handleContactData = async (addData) => {
        await axios.post('/addContact/new', {

            reciverNumber: addData.givenPhone,
            senderId: user._id,

        }).then((res) => {
            setContactData((prev)=>[...prev,res.data]);
        }).catch((err) => {
            alert(err.message);
        })
        await axios.get(`/addContact/getUserId/${addData.givenPhone}`).then((res) => {
            socket?.emit("addContact",{
                reciverId: res.data[0]._id,
                senderId: user._id,
            });  
        })
        handleClose();
    }
    useEffect(() =>{
        socket?.emit('addUser',user._id);
        socket.on("getContact", (data) => {
            console.log(data)
            setArrivalContact(data);
        })
    },[]);
    useEffect(() =>{
        arrivalContact && setContactData((prev)=> [...prev,arrivalContact]);
    },[arrivalContact]);

    const handleIndividualChat = (data) => {
        setConvId(data);
    }
    console.log(arrivalContact)
    console.log(contactData);
    return (
        <div className="Sidebar">
            <div className="sidebar_header">
                <Avatar src="" />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton onClick={handleOpen}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat" value={Cookies.get('_id')} />
                </div>
            </div>

            {/*Rendiring the contact List*/}
            <div className="sidebar_chat">
                {contactData ? contactData.map((res, index) => <button className="chatButton" onClick={() => handleIndividualChat(res)}><SidebarChat data={res.members} key={index} /></button>) : <p>No contact Found</p>}
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <AddContact handleContactData={handleContactData} />
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Sidebar