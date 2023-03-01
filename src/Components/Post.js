import React, { useState, useEffect } from 'react'
import List from './List';
import './Post.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth0 } from "@auth0/auth0-react";
import DyPost from './DyPost';


const Post = () => {
    const [inputValue, setInputValue] = useState([]);
    const [post, setPost] = useState([]);
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        const storedPost = JSON.parse(localStorage.getItem('post'));
        if (storedPost) {
            setPost(storedPost);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('post', JSON.stringify(post));
    }, [post]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== "") {
            setPost([...post, inputValue]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        const newPost = [...post];
        newPost.splice(index, 1);
        setPost(newPost);
        localStorage.setItem('post', JSON.stringify(newPost));
    };

    return (
        <>
            <div className="feed">
                <div className="post">
                    <div className='profile'>
                        {
                            isAuthenticated ? (
                                <Tippy content={<div>
                                    {user.name} <br />
                                    {user.email}
                                </div>}>
                                    <div className="prof">
                                        <img src={user.picture} width={50} alt='image' />
                                    </div>
                                </Tippy>
                            ) : (
                                <div className="prof">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                            )
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
                            <DyPost key={index} post={ele} onDelete={() => handleDeleteTodo(index)} />
                        )
                    })
                }
                <List />
            </div >
        </>
    )
}

export default Post