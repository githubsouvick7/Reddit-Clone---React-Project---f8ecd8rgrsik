import React, { useState } from 'react'
import './Post.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth0 } from "@auth0/auth0-react";

const DyPost = ({ post, onDelete }) => {
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
                                        onClick={onDelete}></i>
                                </Tippy>
                            ) : (
                                <Tippy content={<p>Please Login</p>}>
                                    <i class="fa-solid fa-eye-slash"></i>
                                </Tippy>
                            )
                        }
                    </div>
                    <div className='posttext'>
                        <h4>{post}</h4>
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
}

export default DyPost