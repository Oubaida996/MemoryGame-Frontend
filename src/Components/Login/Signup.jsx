import React, { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Signup() {

    const navigate = useNavigate();
    const login = useContext(LoginContext);
    const [open, setOpen] = React.useState(false); //snackbar
    const [userEmail, setUserEmail] = useState(null);
    const [userName, setUserName] = useState(null);
    const [pwd, setPwd] = useState(null);
    const [confirmPwd, setConfirmPwd] = useState(null);
    const [error, setError] = useState({
        email: null,
        name: null,
        pwd: null,
        confirmPwd: null
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };   //snackbar

    const regExp = RegExp(
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    );//email validation regExp 

    const handelSignUp = (e) => {
        e.preventDefault();
        if (userEmail === null || userEmail === '' ||
            userName === null || userName === '' ||
            pwd === null || pwd === '' ||
            confirmPwd === null || confirmPwd === '') {
            setError({
                email: userEmail === null || userEmail === '' ? 'Email is required' : null,
                name: userName === null || userName === '' ? 'Name is required' : null,
                pwd: pwd === null || pwd === '' ? 'Password is required' : null,
                confirmPwd: confirmPwd === null || confirmPwd === '' ? 'Confirm Password is required' : null
            });
        } else if (!regExp.test(userEmail)) {
            setError({
                email: 'Email is invalid'
            });

        } else if (pwd !== confirmPwd) {
            console.log({ pwd }, { confirmPwd });
            setError({
                confirmPwd: 'Password is not match'
            });
        }
        else {
            setError({
                email: userEmail === null ? 'Email is required' : null,
                name: userName === null ? 'Name is required' : null,
                pwd: pwd === null ? 'Password is required' : null,
                confirmPwd: confirmPwd === null ? 'Confirm Password is required' : null
            });
            const email = userEmail.toLowerCase().trim();
            //signup function from context;
            if (login.signUp(email, pwd, userName)) {
                setOpen(true);
                setTimeout(() => {
                    navigate('/login');
                }
                    , 3000);
            }
        }
    }


    useEffect(() => {
    }, [error, userEmail, userName, pwd, confirmPwd]);





    return (

        <div className='Signup'>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Thanks for signup you can login now.
                </Alert>
            </Snackbar>




            <form className='form' onSubmit={handelSignUp}>
                <input type="email" placeholder='Email' onChange={(e) => setUserEmail(e.target.value)} />
                {error.email && <p className='error'>{error.email}</p>}


                <input type="text" placeholder='User Name' onChange={(e) => setUserName(e.target.value)} />
                {error.name && <p className='error'>{error.name}</p>}


                <input autoComplete="none" type="password" placeholder='Password' onChange={(e) => setPwd(e.target.value)} />
                {error.pwd && <p className='error'>{error.pwd}</p>}

                <input autoComplete="none" type="password" placeholder='Confirm Password' onChange={(e) => setConfirmPwd(e.target.value)} />
                {error.confirmPwd && <p className='error'>{error.confirmPwd}</p>}


                <input type="submit" value={'signUp'} />
            </form>
        </div>
    )
}





