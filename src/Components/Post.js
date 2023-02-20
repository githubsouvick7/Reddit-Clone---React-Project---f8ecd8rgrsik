import React, { useState, useEffect } from 'react'
import List from './List';
import './Post.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth0 } from "@auth0/auth0-react";


const Post = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [count, setCount] = useState(0);

    const plusCount = () => {
        setCount(count + 1)
    }
    const minCount = () => {
        if (count != 0) {
            setCount(count - 1);
        }
    }

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== "") {
            setTodos([...todos, inputValue]);
            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
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
                    todos.map((e, i) => {
                        return (
                            <>
                                <div className="list">
                                    <div className="sidebox">
                                        <i class="fa-solid fa-arrow-up" onClick={plusCount}></i>
                                        <span>{count}</span>
                                        <i class="fa-solid fa-arrow-down" onClick={minCount}></i>
                                    </div>
                                    <div className="box">
                                        <div className='title'>
                                            <button className='join'>join</button>
                                            {
                                                isAuthenticated ? (
                                                    <Tippy content={<p>Hide</p>}>
                                                        <i class="fa-solid fa-eye-slash"
                                                            onClick={handleDeleteTodo}></i>
                                                    </Tippy>
                                                ) : (
                                                    <Tippy content={<p>Please Login</p>}>
                                                        <i class="fa-solid fa-eye-slash"></i>
                                                    </Tippy>
                                                )
                                            }
                                        </div>
                                        <div className='posttext'>
                                            <h4 key={i}>{todos}</h4>
                                        </div>
                                        <div className='like'>
                                            <div><i class="fa-solid fa-comment"></i> Comment</div>
                                            <div><i class="fa-solid fa-share"></i> Share</div>
                                            <div><i class="fa-solid fa-bookmark"></i> Save</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
                <List />
            </div >
        </>
    )
}

export default Post