import React, { useEffect, useState, useContext } from 'react';
import ImageGame from './ImageGame/ImageGame';
import './game.scss';
import axios from 'axios';
import { LoginContext } from '../../context/auth';
import { useNavigate } from 'react-router-dom';



export default function Game() {
    const login = useContext(LoginContext);
    const navigate = useNavigate();
    const [imageList, setImageList] = useState([]);
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    const getImageList = () => {
        return new Promise((resolve, reject) => {

            axios.get(`${login.API}/getImages/6301ccb0a9903012bf1e5629`).then((data) => {
                // console.log(data.data, 'get Image list');
                console.log(data.data);
                let newArr = [...data.data, ...data.data];
                // I should edit it from backend request :) 
                let updateObj = newArr.map((item, index) => {
                    return { ...item, state: "" };
                });
                // console.log(obj, 'obj');
                shuffle(updateObj);
                setImageList(updateObj);
                resolve(data.data);
            }).catch(err => {
                console.log('err from getImagelist function ', err);
                reject(err);
            })

        });
    }


    useEffect(() => {
        getImageList();
    }, []);

    //===========Start handle image-game
    const [prev, setPrev] = useState(-1);

    function check(current) {
        // console.log(current);
        // console.log(imageList[current], 'current');
        if (imageList[current]._id === imageList[prev]._id) {
            imageList[current]["state"] = "correct";
            imageList[prev]["state"] = "correct";
            setImageList([...imageList]);
            setPrev(-1);
        } else {
            imageList[current]["state"] = "wrong";
            imageList[prev]["state"] = "wrong";
            setImageList([...imageList]);
            setTimeout(() => {
                imageList[current]["state"] = "";
                imageList[prev]["state"] = "";
                setImageList([...imageList]);
                setPrev(-1);
            }, 1000);
        }
    }

    function handleId(id, imageID) {
        // e.preventDefault();
        console.log(id, 3333333333);
        if (prev === -1) {
            imageList[id]["state"] = "active";
            console.log(imageList, 'dddddd');
            setImageList([...imageList])
            setPrev(id);
        }
        else {
            check(id);
        }

        // console.log(imageList[id], 111111111111);
        console.log(imageList, 2222);


    }
    //===========End handle image-game
    return (
        <div className='container-game'>
            <span className="material-symbols-outlined arrow-back" onClick={() => {
                navigate('/');
            }}>
                arrow_back
            </span>
            <div className="tracker">
                {Array(7).fill().map((item, index) => {
                    return (<div key={index} className='item-no'>
                        <div className="noOfTracker">
                            {index + 1}
                        </div>
                        <div className="line"></div>
                    </div>)
                })}

            </div>
            <div className="question-voice">
                <span className="material-symbols-outlined volume">
                    volume_down_alt
                </span>
                <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laci dollacii
                    met, consectetur ad quam ?</h5>
            </div>
            <div className="images-game">

                {
                    imageList && imageList.map((image, index) => {
                        return (
                            <ImageGame key={index} image={image} handleId={handleId} id={index} />

                        )


                    })}



            </div>
        </div>
    )
}
