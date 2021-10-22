import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
function AddContact({ handleContactData }) {
    const [givenPhone, setGivenPhone] = useState('');

    const handleSubmit = (e) => {
        var rand =  10000 + (Math.random() * (1000000000-100000));
        handleContactData({givenPhone: givenPhone, message_id:rand });
    }

    return (

        <div>
            <TextField id="outlined-basic" label="Phone Number" variant="outlined" type="text" value={givenPhone} onChange={(e) => setGivenPhone(e.target.value)} />
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default AddContact
