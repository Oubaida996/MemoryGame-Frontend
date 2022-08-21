import React, { useState, useContext } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/auth';

import './question.scss';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




export default function Question() {
    const login = useContext(LoginContext);

    const navigate = useNavigate();
    const location = useLocation();
    const [text, setText] = useState();
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const setTextHandler = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        setText(e.target.value);

    }

    const addQuestionHandler = async () => {

        await axios.post(`${login.API}/questions`, {
            question: text
        },
            {
                headers: {
                    'Authorization': `Bearer ${location.state.token}`
                }
            }
        ).then(res => {
            // console.log(res);
            setTimeout(() => {
                navigate(`/uploadImages/${res.data._id}`);

            }, 2000);
            setOpen(true);
        }).catch((err) => {
            console.log(err, 'from post questions');
        });

    }
    return (
        <div className='question'>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {'the question has been added'}
                </Alert>
            </Snackbar>
            <h3>Question</h3>
            <TextareaAutosize
                onChange={setTextHandler}
                maxRows={4}
                aria-label="maximum height"
                placeholder="Ex :Add your question ,Match between Images"
                // defaultValue="Ex :Add your question ,Match between Images"
                style={{ width: 400, height: 200 }}
            />
            <button onClick={addQuestionHandler} >Save</button>
        </div>


    )
}
