import React, { useState, useEffect } from 'react';
import base64 from 'base-64';
import superagent from 'superagent';
import jwt from 'jwt-decode';
import cookie from 'react-cookies';



const API = 'https://memory-game-apps.herokuapp.com';
export const LoginContext = React.createContext();//used by the consumer

export default function LoginProvider(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});


    async function signUp(user_email, user_pwd, user_name) {

        await superagent.post(`${API}/signup`).send({ user_email: user_email, user_pwd: user_pwd, user_name: user_name });
    }

    // Basic encoded(email:password) >> Basic eW=hdtgsjs
    const login = async (user_email, user_pwd) => {
        // console.log('inside login >> user_email', user_email);
        // localhost:3000/signin
        try {

            const response = await superagent.get(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${user_email}:${user_pwd}`)}`);
            // {info :req.user , token :req.token} response form backend

            validateMyUser(response.body);
            // console.log('inside login >> response', response.body);
            return response.body;
        } catch (error) {
            return false;
        }

        //userInfo + token
    }

    const validateMyUser = (data) => {
        if (data) {
            const validUser = jwt(data.token);
            // console.log(validUser);
            if (validUser) {
                setLoginstate(true, data);
                cookie.save('userData', data);
            } else {
                setLoginstate(false, {})
            }
        } else {
            setLoginstate(false, {})
        }

    }

    const setLoginstate = (isLogged, userData) => {
        setLoggedIn(isLogged);
        setUser(userData.info);
    }

    const logout = () => {
        setLoggedIn(false);
        setUser({});
        cookie.remove('userData');
    }

    useEffect(() => {
        const myUserInfo = cookie.load('userData');
        // console.log({ myUserInfo });
        validateMyUser(myUserInfo);
    }, []);

    //authorize
    const canDo = (capability) => {
        // optional chaining 
        return user?.isAdmin;
    }

    const state = {
        signUp: signUp,
        loggedIn: loggedIn,
        user: user,
        login: login,
        logout: logout,
        canDo: canDo,
        API: API
    }

    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )

}
