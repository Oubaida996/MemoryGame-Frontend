import React, { useContext, useState } from 'react'
import { LoginContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const navigate = useNavigate();
    const login = useContext(LoginContext);
    const [userEmail, setUserEmail] = useState();
    const [pwd, setPwd] = useState();
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false); //snackbar
    const [name, setName] = useState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handelLogin = async (e) => {
        e.preventDefault();
        const email = userEmail.toLowerCase().trim();
        const validUser = await login.login(email, pwd);
        console.log({ validUser });
        if (validUser === false) {
            setError('Invalid email or password');
        } else {
            setName(validUser.info.user_email);
            setTimeout(() => {
                navigate('/question', { state: validUser });
            }, 2000);
            setOpen(true);
        }
    }

    const guestHandler = () => {
        navigate('/game');
    }

    return (
        <div className='login'>

            <input className='guest' value={'Guest'} onClick={guestHandler} />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {'Welcome ' + '   ' + name}
                </Alert>
            </Snackbar>
            <form className='form' onSubmit={handelLogin}>
                <h5>email :admin , pwd :123</h5><br />
                <input type="text" placeholder='Email' onChange={(e) => setUserEmail(e.target.value)} />
                <input autoComplete='none' type="password" placeholder='Password' onChange={(e) => setPwd(e.target.value)} />
                {error && <p>{error}</p>}
                <input type="submit" value={'login'} />
            </form>
        </div>
    )
}
