import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import './uploadImage.scss';
import { LoginContext } from '../../context/auth';
import { useParams, useNavigate } from 'react-router-dom';






export default function UploadImage() {
    const navigate = useNavigate();
    const login = useContext(LoginContext);
    const [selectedFile, setSelectedFile] = useState();
    const [imageList, setImageList] = useState([]);
    const { question_id } = useParams();
    const fileSelectedHandler = (event) => {
        // console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);

    }
    const fileUploadHandler = async () => {
        console.log(1111);
        const fd = new FormData();
        console.log(2222);

        fd.append('image', selectedFile, selectedFile.name);
        console.log(3333);

        await axios.post(`${login.API}/uploadImages/${question_id}`, fd).then(async res => {
            console.log(44444);

            await getImageList();
            console.log(55555);

            console.log(res);
            console.log(6666666);

        }).catch((err) => {
            console.log('error from fileUploadHandler', err);
        });
    }
    const getImageList = () => {
        return new Promise((resolve, reject) => {

            axios.get(`${login.API}/getImages/${question_id}`).then((data) => {
                // console.log(data.data, 'get Image list');
                setImageList(data.data);
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



    return (
        <div className='uploadImage'>
            {/* {console.log(imageList)} */}
            <input className='home' value={'Home'} onClick={() => {
                navigate('/');
            }} />
            <h4>You should select one image then click upload to add it </h4>
            <div className='form-uploadImage'>
                <input type="file" onChange={fileSelectedHandler} />
                <button onClick={fileUploadHandler}>upload</button>
            </div>
            <div className='images'>
                {
                    imageList && imageList.map((image, index) => {
                        return (<img key={index} src={`data:${image.img.contentType};base64, ${Buffer.from(image.img.data).toString('base64')}`
                        } />)
                    })}
            </div>



        </div>
    )
}
