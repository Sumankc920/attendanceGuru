import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from '../../context/AuthProvider';

import { ToggleSlider }  from "react-toggle-slider";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import './Setting.css'

const Setting = (props) => {
    const [lightMode, setLightMode] = useState(("lightMode" in localStorage)? localStorage.getItem("lightMode"):true);
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [active, setActive] = useState(false);
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if(active) props.notificationClick(false);
    },[active])


    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/');
        localStorage.removeItem("password");
        localStorage.removeItem("email");
    }

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
        setLightMode(!checked);
      };
    

    return (
        <div class='w-96 h-50 flex-col menu mt-10'>
        {/* Settings Heading */}
        <h1 class='text-discordBlue mb-4 text-center text-3xl'>AG Settings</h1>
        {/* Theme Selection */}
        <div class='flex justify-between my-4 w-full bg-gray-200 rounded-full px-5 py-3'>
            <h1 class='text-discordBlue text-2xl'>Theme</h1>
            {/* Theme Icon */}
            <div class='bg-gray-500 p-1 w-10 h-10 rounded-full'><DarkModeSwitch
                style={{ marginBottom: '2rem' }}
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={30}
            /></div>
        </div>
        {/* Notification Selection */}
        <div class='flex justify-between my-4 w-full bg-gray-200 rounded-full px-5 py-3'>
            <h1 class='text-discordBlue text-2xl'>Notifications</h1>
            {/* Notifications ON OFF icon */}
            <ToggleSlider onToggle={(state) => {
                setActive(state);
            }} />
        </div>
        {/* Logout Button */}
        <div class='flex justify-center'><button class='text-white border-2 border-discordBlue px-6 py-2 bg-discordBlue hover:text-discordBlue hover:bg-white rounded-full my-4' onClick={logout}>Logout</button></div>
        </div>
    )
}

export default Setting
