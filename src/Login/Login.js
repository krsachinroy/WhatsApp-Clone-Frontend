import React, { useState } from 'react'
import './CSS/Login.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from '../axios';
import Cookies from 'js-cookie';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Login({ setData }) {

    const [phone, setPhone] = useState('');
    const [open, setOpen] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [username, setUsername] = useState('');

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
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
    const classes = useStyles();


    const onSubmitDetails = async (e) => {
        if (phone && passcode && username) {
            await axios.post('/login/new', {
                Phone: phone,
                Passcode: passcode,
                Username: username,
            }).then((res) => {
                const user = res.data[0];
                Cookies.set('User', user._id);
                setData();
            }).catch((err) => console.log(err));
        }
        else {
            alert('Fill data corectlly...')
        }
        setPhone("");
        setPasscode('');
        setUsername('');
    }

    const onSubmitSignIn = async () => {
        await axios.post('/login/signin', {
            phoneNumber: phone,
            Passcode: passcode
        }).then((res) => {
            const user = res.data[0]
            Cookies.set('User', user);
            setData();
        }).catch((err) => {
            alert("Failed To login")
        })
        setPhone("");
        setPasscode('');

    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="Login_container">
            <div className="Login_from" >
                <div id="sign-in-button"></div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Enter Username" variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <TextField id="outlined-basic" label="Enter the Passcode" variant="outlined" type="text" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
                    <Button variant="outlined" color="primary" onClick={onSubmitDetails}>
                        SignUp
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handleOpen}>
                        SignIn
                    </Button>
                </form>
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
                        <TextField id="outlined-basic" label="Phone Number" variant="outlined" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <TextField id="outlined-basic" label="Enter the Passcode" variant="outlined" type="text" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
                        <Button variant="outlined" color="primary" onClick={onSubmitSignIn}>
                            SignIn
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Login
