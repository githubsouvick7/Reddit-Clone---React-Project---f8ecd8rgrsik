import React, { useState, useEffect } from 'react'
import List from './List';
import './Post.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth0 } from "@auth0/auth0-react";
import DPost from './DyPost';


const Post = () => {
    const [inputValue, setInputValue] = useState([]);
    const [post, setPost] = useState([]);
    const { user, isAuthenticated } = useAuth0();


    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setPost(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(post));
    }, [post]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() != "") {
            setPost([...post, inputValue]);
            setInputValue("");
        }
    };



    return (
        <>
            <div className="feed">
                <div className="post">
                    <div className='profile'>
                        {
                            isAuthenticated ? (<Tippy content={<div>
                                {user.name} <br />
                                {user.email}
                            </div>}>
                                <div className="prof">
                                    <img src={user.picture} width={50} />
                                </div>
                            </Tippy>) : (<div className="prof">
                                <i class="fa-solid fa-user"></i>
                            </div>)
                        }
                    </div>
                    <form className='from' >
                        <div className='input'>
                            <input type="text"
                                placeholder='Create Post . . . '
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='send'>
                            {
                                isAuthenticated ? (
                                    <button className='sendbtn' onClick={handleFormSubmit}>Post</button>
                                ) : (
                                    <button className='sendbtn' onClick={() => alert('please login')}>post</button>
                                )
                            }
                        </div>
                    </form>
                </div>
                {
                    post.map((ele, index) => {
                        return (
                            <DPost key={index} post={ele} />
                        )
                    })
                }
                <List />
            </div >
        </>
    )
}

export default Post