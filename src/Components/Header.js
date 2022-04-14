import React from 'react'
import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { ImageUpload } from './ImageUpload';
import "./Header.css";

export const Header = ({ user }) => {
    const [barVisibility, setBarVisibility] = useState(false);

    return (
        <div className="app__header">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="header__img" />
            <FaPlusCircle className="add__post" onClick={() => setBarVisibility(!barVisibility)} />

            {
                user?.displayName ? (
                    <ImageUpload username={user.displayName} barVisibility={barVisibility} />)
                    : (<h3> Sorry you need to login to upload</h3>)
            }
        </div>
    )
}
