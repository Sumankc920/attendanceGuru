import React, { useState, useRef, useEffect } from 'react'
import axios from '../../api/axios'
import { Link, useNavigate } from 'react-router-dom'
import background from '../../assets/Images/background.png'
import Bars from 'react-loading-icons/dist/esm/components/bars';


const Otp = () => {

    const firstInputBoxRef = useRef();

    useEffect(() => {
        firstInputBoxRef.current.focus();
    }, [])

    const navigate = useNavigate();

    const [otp, updateOtp] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const onButtonClick = (e) => {
        e.preventDefault();
        if(otp !== '' && otp.toString().length === 6 && !isNaN(otp)){
            postData();
        }
        if(otp.toString().length !== 6 || isNaN(otp)){
            setErrMsg('Invalid OTP');
        }
    }

    const postData = async () => {
        setErrMsg('');
        setIsButtonLoading(true);
        const formData = {
            message : otp,
        }

        try{
            const response = await axios.post("/signup/confirm_otp", 
            JSON.stringify(formData), 
            {
                headers : {'Content-Type' : 'application/json'},
                withCredentials : true
            });
            const data = await response.data;
            setIsButtonLoading(false);
            if(data.message === 'success'){
                navigate('/login');
            }else{
                setErrMsg(data.message);
            }
            console.log(data);
        }catch(error){
            if (!error?.response){
                setErrMsg('No Server Response');
            }else if (error.response?.status === 400){
                setErrMsg('Missing OTP');
            }else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            }else {
                setErrMsg('Registration Failed');
            }
            setIsButtonLoading(false);
        }
    }
    
    return (
        <div class='bg-cover bg-center bg-no-repeat bg-fixed md:h-screen md:w-screen md:flex md:justify-center md:items-center' style={{backgroundImage : `url(${background})`}}>
            <div class='h-screen w-screen bg-discordBlack text-discordWhite py-10 px-6 md:w-1/3 md:h-auto'>
                <h1 class='text-center text-2xl'>Just a Minute</h1>
                {(errMsg)?<p class='my-3 text-center text-red-500'>{errMsg}</p>:<p class='my-3 text-center text-red-500 invisible'>this is something</p>}
                {(otp === null)?<p class='my-3 text-center text-green-500'>We've sent OTP to your mail</p>:<p class='my-3 text-center text-red-500 invisible'>this is something</p>}
                <p class='uppercase hidden md:block'>otp</p>
                <input ref={firstInputBoxRef} type="text" class='bg-discordDarkBlack w-full placeholder:uppercase mb-3 p-2 outline-none md:placeholder:opacity-0' required placeholder='OTP' onChange={(el) => {updateOtp(el.target.value); setErrMsg('')}}></input>
                <p class='mb-4'>Didn't get it? <span class='text-discordBlue underline'><Link to="#">Resend</Link></span></p>
                <button class='bg-discordBlue text-discordWhite border-discordBlue rounded-none w-full p-2 flex justify-center h-10' onClick={onButtonClick}>{(isButtonLoading)?<Bars class='w-5 h-5' style={{width : '20px', height:'20px'}} />:"Verify"}</button>
            </div>
        </div>
    )
}

export default Otp
