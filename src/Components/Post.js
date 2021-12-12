import { Avatar } from '@material-ui/core';
import React from 'react';
import "./Post.css";

export const Post = ({ Username, ImageURL, Caption }) => {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="a"
                    src="/static/images/avatar/1.jpg" />
                <h3>{Username}</h3>
            </div>

            <img className="post__image" src={ImageURL} />
            <h4 className="post__text"><strong>{Username} </strong> {Caption}</h4>

        </div>
    )
}
